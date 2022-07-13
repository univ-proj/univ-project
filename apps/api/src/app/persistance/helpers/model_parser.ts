import logger from '@/logger';
import mongoose from 'mongoose';
import { IModelMap, IModelsKeys } from '@/persistance/database/mongodb';

const models_to_mongodb_map = {
  string: () => String,
  number: () => Number,
  date: () => Date,
  object: () => String, // ref
  enum: () => String,
  boolean: () => Boolean,
  array: Array.of,
};

/**
 *
 * @param {IModalsMap} models_config
 */
export function parse_modal_config_relations(models_config: IModelMap) {
  logger.info('start creating modals');
  return Object.keys(models_config).reduce((acc, model_key: IModelsKeys) => {
    acc[model_key] = instantiate_modal_relations(models_config, model_key);
    return acc;
  }, {}) as IModelMap;
}

function build_mongoose_schema_type(field) {
  const [type, subtype] = field.type.split(':');

  return {
    type: models_to_mongodb_map[type](subtype),
    enum: field.enum,
  };
}

function parse_modal_relation(
  models_config,
  model_key: IModelsKeys,
  val,
  relation_type: 'field' | 'relation' = 'field'
) {
  if (!val.type.startsWith('object')) {
    return build_mongoose_schema_type(val);
  }
  const [, type] = val.type.split('object:');

  const foreign_model = models_config[type];
  if (!foreign_model) {
    logger.error(`${val.type} modal does not exist`);
    process.exit(1);
  }

  const field_type = {
    type: String,
    ref: type,
  };

  if (relation_type === 'relation') {
    return {
      type: [field_type],
      select: false,
    };
  }
  return {
    ...field_type,
    // select: false,
  };
}

/**
 *
 * @param {string} model_key
 */
function instantiate_modal_relations(models_config, model_key: IModelsKeys) {
  const model = models_config[model_key];

  // add relationship key
  const fields = Object.entries(model.fields).reduce(
    (acc, [field_key, field]) => {
      acc[field_key] = parse_modal_relation(models_config, model_key, field);
      return acc;
    },
    {}
  );

  const relations = Object.entries(model.relations).reduce(
    (acc, [relation_key, relation]) => {
      acc[relation_key] = parse_modal_relation(
        models_config,
        model_key,
        relation,
        'relation'
      );
      return acc;
    },
    {}
  );

  return {
    ...model,
    fields: { ...fields, ...relations },
  };
}

export function parse_models(models_config: IModelMap) {
  return Object.entries(models_config).reduce<{
    [x in IModelsKeys]?: mongoose.Model<IModelMap[x]['model_ref']>;
  }>((acc, [model_key, model]) => {
    const model_schema = new mongoose.Schema(
      {
        ...model.fields,
        _id: {
          type: String,
          // unique: true,
        }, // uuidv4
      },
      {
        ...model.config,
        // id: false,
        // _id: false,
        validateBeforeSave: false,
      }
    );

    acc[model_key] = mongoose.model(model_key, model_schema);
    return acc;
  }, {});
}
