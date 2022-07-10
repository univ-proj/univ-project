import errors from '@/errors';
import logger from '@/logger';
import mongodb from '@/persistance/database/mongodb';
import id_generator from './utils/id_generator';
import { runFieldsValidators } from '@/persistance/validators';
import * as _ from 'lodash';

/**
 * @typedef {keyof typeof import('@/persistance/models')} IModalKeys
 */

const database_drivers = {
  mongodb,
};

/**
 *
 * @param {import('@/config').IConfig} config
 * @param {{[x: string]: IModel}} models
 * @returns {import('./database/mongodb').IDatabase}
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
   * @type {import('./database/mongodb').IDatabase}
   */
  const persistence = {
    async get_object({ model_name, id }, options) {
      logger.info(`persistence.get_object ${model_name}`);
      const model_config = get_model_config(model_name);

      logger.info('cache miss');
      const fetched_object = await db.get_object({ model_name, id }, options);

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

      // TODO: add Pub/Sub (db hooks)
      logger.info('persist the updates on db layer');
      const updated_object = await db.update_object(
        { model_name, id, ...sanitized_body },
        options
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
      const deleted_object = await db.delete_object(
        { model_name, id },
        options
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

      return db.list_relations(relation, options);
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
