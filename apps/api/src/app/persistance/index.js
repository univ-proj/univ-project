import errors from '@/errors';
import logger from '@/logger';
import mongodb from '@/persistance/database/mongodb';
import id_generator from './utils/id_generator';
import { runFieldsValidators } from '@/persistance/validators';
import * as _ from 'lodash';
import parse_expand_query from './helpers/expands_parser';

/**
 * @typedef {keyof typeof import('@/persistance/models')} IModalKeys
 */

const database_drivers = {
  mongodb,
};

/**
 * @typedef {import('./database/mongodb').IDatabase} IPersistanceDriver
 */

/**
 *
 * @param {import('@/config').IConfig} config
 * @param {{[x: string]: IModel}} models
 * @returns {IPersistanceDriver}
 */
export default function create_client(config, models) {
  logger.info('initializing persistence');

  logger.info('initializing database driver');

  const database_driver = database_drivers[config.database];

  if (!database_driver) {
    logger.error('database driver not selected, please check your env file');
    process.exit();
  }

  logger.info('selected database driver', { driver: config.database });

  /** @type {import('./database/mongodb').IDatabase} */
  const db = database_driver(config, models);

  logger.info('persistence drivers initialized');

  /**
   *
   * @param {string} model_name
   * @return {IModel}
   */
  function get_model_config(model_name) {
    const model_config = models[model_name];

    if (!model_config) {
      throw errors.invalid_resource();
    }

    return model_config;
  }

  /**
   * @type {IPersistanceDriver}
   */

  const persistence = {
    async get_object({ model_name, id }, { expand } = {}) {
      logger.info(`persistence.get_object ${model_name}`);
      const model_config = get_model_config(model_name);

      const parsed_expand = parse_expand_query(models, model_name, expand);

      const fetched_object = await db.get_object(
        { model_name, id },
        { expand: parsed_expand }
      );

      if (!fetched_object) {
        throw errors.not_found();
      }

      return fetched_object;
    },

    async create_object(
      { model_name, ...body },
      // { expand, author } = {}
      options = {}
    ) {
      logger.info(`persistence.create_object ${model_name}`);
      const model_config = get_model_config(model_name);

      const sanitized_body = _.pick(body, _.keys(model_config.fields));

      logger.info('run validators');
      const { valid, invalid_fields } = runFieldsValidators(
        model_config,
        sanitized_body
      );

      if (!valid) {
        logger.info('validation error');
        throw errors.validation_error(invalid_fields);
      }

      logger.info('valid request body');

      const id = id_generator();
      // TODO: add Pub/Sub (db hooks)

      logger.info(`persist object on the db`);
      const created_object = await db.create_object(
        { model_name, id, ...sanitized_body },
        options
      );

      return created_object;
    },

    async update_object(
      { model_name, id, ...body },
      // { expand, author } = {}
      options = {}
    ) {
      logger.info(`persistence.update_object ${model_name} with id: ${id}`);
      const model_config = get_model_config(model_name);

      const sanitized_body = _.pick(body, _.keys(model_config.fields));

      logger.info('run validation');
      const { valid, invalid_fields } = runFieldsValidators(
        model_config,
        sanitized_body,
        true
      );

      if (!valid) {
        logger.info('validation error');
        throw errors.validation_error(invalid_fields);
      }

      logger.info('valid request body');

      // will fetch object and throw if not found
      await this.get_object({ model_name, id });

      const parsed_expand = parse_expand_query(
        models,
        model_name,
        options.expand
      );

      // TODO: add Pub/Sub (db hooks)
      logger.info('persist the updates on db layer');
      const updated_object = await db.update_object(
        { model_name, id, ...sanitized_body },
        { expand: parsed_expand }
      );

      return updated_object;
    },

    async delete_object({ model_name, id }, options = {}) {
      logger.info(`persistence.delete_object ${model_name} with id: ${id}`);
      const model_config = get_model_config(model_name);

      logger.info('check that object exists');
      // will fetch object and throw if not found
      await this.get_object({ model_name, id });

      logger.info('delete object from db layer');
      const parsed_expand = parse_expand_query(
        models,
        model_name,
        options.expand
      );

      const deleted_object = await db.delete_object(
        { model_name, id },
        { expand: parsed_expand }
      );

      return deleted_object;
    },
    async create_relation(relation, options) {
      logger.info(
        `persistance.create_relation "${relation.name}" for ${relation.src_model} model with id ${relation.src_id}`
      );

      return db.create_relation(relation, options);
    },
    async delete_relation(relation, options) {
      logger.info(
        `persistance.delete_relation "${relation.name}" for ${relation.src_model} model with id ${relation.src_id}`
      );

      return db.delete_relation(relation, options);
    },
    async relation_exists(relation, options) {
      logger.info(
        `persistance.relation_exists of type "${relation.name}" for ${relation.src_model} model with id ${relation.src_id} and dst with id ${relation.dst_id}`
      );

      return db.relation_exists(relation, options);
    },
    async list_relations(relation, options) {
      logger.info(
        `persistance.list_relations of type "${relation.name}" for ${relation.src_model} model with id ${relation.src_id}`
      );
      const model_config = models[relation.src_model];

      if (!model_config) {
        throw errors.model_not_found();
      }

      const relation_config = model_config.relations[relation.name];
      // check if relation exists
      if (!relation_config) {
        throw errors.invalid_db_relation();
      }

      const dst_model_name = relation_config.type.replace('object:', '');

      const parsed_expand = parse_expand_query(
        models,
        dst_model_name,
        options.expand
      );

      return db.list_relations(relation, { expand: parsed_expand });
    },
    truncate() {
      logger.info(`persistance.truncate`);
      // db truncate
      db.truncate();
    },
    close() {
      logger.info(`persistance.close`);
      // db close
      db.close();
    },
    _models: models,
  };
  return persistence;
}
