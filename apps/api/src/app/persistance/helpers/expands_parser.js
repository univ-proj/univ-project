import * as _ from 'lodash';
import * as balanced from 'balanced-match';
import { parse } from 'micromatch';
import errors from '@/errors';
import config from '@/config';

function is_nested(token) {
  let pointer = token;
  let opening_curly_braces = 0;
  let opening_parens = 0;

  while (pointer) {
    if (pointer.type === 'paren') {
      opening_parens += pointer.value === ')' ? -1 : +1;
    }

    if (pointer.type === 'brace') {
      opening_curly_braces += pointer.value === '\\}' ? -1 : +1;
    }

    pointer = pointer.prev;
  }

  return opening_curly_braces !== 0 || opening_parens !== 0;
}

export default function parse_expand_query(models, object_type, expands) {
  const query_parser = (expands, object_type) => {
    const object_relations = Object.keys(models[object_type]?.relations);
    const object_fields = _.difference(
      Object.keys(models[object_type]?.fields),
      object_relations
    );

    // generate AST from query
    let parsed;

    try {
      [parsed] = parse(expands, { strictBrackets: true, expandRange: {} });
    } catch (e) {
      throw errors.invalid_expands_query({
        query: expands,
        error: e.message,
      });
    }

    const fields = { fields: [], relations: [] };
    // initialize a pointer so it could hold the value until parsing each nested field
    let pointer;

    // loop string token
    parsed?.tokens?.forEach((token) => {
      // operate only on every first text token in nested string
      if (!(token.type === 'text' && !is_nested(token))) {
        return;
      }

      pointer = {};

      // set the field name to the first token value
      // since < sign is treated as text so we need to exclude it
      const less_than_sign_index = token.value.indexOf('<');

      pointer.field_name =
        less_than_sign_index === -1
          ? token.value
          : token.value.slice(0, less_than_sign_index);

      // check fields against the graph
      const is_field = object_fields.includes(pointer.field_name);
      const is_relation = object_relations.includes(pointer.field_name);

      // throw if field invalid and has nested expands (other than that ignore)
      if (!is_relation && !is_field) {
        throw errors.invalid_expands_query({
          error: `${pointer.field_name} type does not exist`,
        });
      }

      const object_config = models[object_type];

      const new_object_type =
        object_config[is_relation ? 'relations' : 'fields'][
          pointer.field_name
        ]?.type?.split('object:')[1];

      pointer.table_name = new_object_type;

      let has_nested_options = false;
      let options_end_index = NaN;

      // match the first options object
      const options_balanced = balanced('(', ')', expands);
      // if options exist and is in the query (eg. bookmarks(1, desc),last_active NOT bookmarks,loved(1, desc))

      has_nested_options = options_balanced?.pre === token.value;
      options_end_index = options_balanced?.end;

      // check if is_edges (ignore field options)
      if (is_relation) {
        pointer.options = {
          limit: Number(config?.expands_options_default_limit || 10),
          sort_type: config?.expands_options_default_sort_type || 'asc',
        };

        if (options_balanced && has_nested_options) {
          const options = options_balanced.body.split(',');

          const limit = options.find((el) => Number(el));
          if (limit) pointer.options.limit = Number(limit);

          const sort_type = options.find((el) => ['asc', 'desc'].includes(el));
          if (sort_type) pointer.options.sort_type = sort_type;
        }
      }

      // throw error if query has options for a field
      if (is_field && has_nested_options) {
        throw errors.invalid_expands_query({
          error: `invalid options, "${options_balanced?.body}". cannot pass options to a field.`,
        });
      }

      const expands_balanced = balanced('{', '}', expands);

      const has_nested_expands =
        (has_nested_options &&
          options_end_index + 1 === expands_balanced?.start) ||
        pointer.field_name.length === expands_balanced?.start;

      // default expands
      pointer.expands = {
        fields: [],
        relations: [],
      };

      // check if field has more expands
      if (has_nested_expands) {
        // throw if field invalid and has nested expands
        if (!new_object_type) {
          throw errors.invalid_expands_query({
            error: `${pointer.field_name} type does not exist`,
          });
        }

        pointer.expands = query_parser(expands_balanced.body, new_object_type);
      }

      // strip the parsed expand
      if (has_nested_expands) {
        expands = expands_balanced.post.slice(1).trim();
      } else if (has_nested_options) {
        expands = expands.slice(options_end_index + 1).trim();
      } else {
        expands = expands.slice(pointer.field_name.length + 1);
      }

      // remove extra comma
      if (expands.startsWith(',')) {
        expands = expands.slice(1);
      }

      if (is_field) {
        fields.fields.push(pointer);
      } else if (is_relation) {
        fields.relations.push(pointer);
      }
    });
    return fields;
  };

  return query_parser(expands, object_type);
}
