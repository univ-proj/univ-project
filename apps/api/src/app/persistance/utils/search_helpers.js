import errors from '@/errors';

/**
 * Parses an array of filter strings
 * @param {string[]} group_filter_query
 * @returns {SingleFilter[]}
 */
function parse_group_filter_query(group_filter_query) {
  return group_filter_query.map((single_filter) => {
    // ["code","543"]
    const result = single_filter.match(/<|>|:|!/);

    if (!result) {
      throw errors.invalid_search_query({
        result,
        single_filter,
        group_filter_query,
      });
    }

    const { index: operator_index } = result;

    const field_name = single_filter.slice(0, operator_index);

    const value = single_filter.slice(operator_index + 1);

    let operator = single_filter[operator_index];

    operator = operator === ':' ? '=' : operator;
    operator = operator === '!' ? '!=' : operator;

    if (!field_name || !value || !operator) {
      throw errors.invalid_search_query({
        operator_index,
        single_filter,
        group_filter_query,
        field_name,
        value,
        operator,
      });
    }

    // if there is in fact a separator and filter is a valid filter
    return { field_name, value, operator };
  });
}

/**
 * @typedef {Object} SingleFilter
 * @property {string} field_name
 * @property {'='|'>'|'<'|'!='} operator
 * @property {any} value
 *
 * Extract filter keys and values from string e.g. code:15645,name:Ziad Alzarka
 * @param {string[][]|string[]|string} filter_query First level is AND and second level is ORs
 * @returns {SingleFilter[][]} First level is AND and second level is ORs
 */
export function extract_filters(filter_query) {
  if (!filter_query) {
    return [];
  }

  // if single string filter
  if (typeof filter_query === 'string') {
    const filters = filter_query.split(',');

    return [parse_group_filter_query(filters)];
  }

  // if filter_query is not a string or an array?
  if (!Array.isArray(filter_query)) {
    throw errors.invalid_search_query({ filter_query });
  }

  // the whole array is a big AND and will consist of an array of ORs
  return filter_query.map((or_filters) => {
    // in case of an or query e.g. code:123 or code:133 ...etc
    if (Array.isArray(or_filters)) {
      return parse_group_filter_query(or_filters);
    }

    if (typeof or_filters === 'string') {
      // in case of a single string filter e.g. code:123
      const filters = or_filters.split(',');

      return parse_group_filter_query(filters);
    }

    throw errors.invalid_search_query({ filter_query });
  });
}

/**
 * Take filters objects and strip the ones that are not defined in the graph
 * @param {SingleFilter[][]} filters
 * @param {import("persistence/graph").IObjectConfig} object_config
 * @returns {SingleFilter[][]}
 */
export function strip_invalid_filters(filters, object_config) {
  const searchable_fields = object_config.search.filters;

  return filters
    .map((filter_group) =>
      filter_group.filter((filter) =>
        searchable_fields.includes(filter.field_name)
      )
    )
    .filter((filter_group) => filter_group.length >= 1);
}
