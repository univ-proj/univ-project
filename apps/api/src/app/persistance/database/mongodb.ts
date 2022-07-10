/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose from 'mongoose';
import * as _ from 'lodash';

import logger from '@/logger';
import errors from '@/errors';
import { IConfig } from '@/config';
import { IModel } from '@/persistance/models/model';

import {
  parse_modal_config_relations,
  parse_models,
} from '../helpers/model_parser';

export type IModelsKeys = keyof typeof import('@/persistance/models');

export type IModelMap = {
  [x in IModelsKeys]: IModel<any>;
};

export interface IRelation {
  name: string;
  src_model: IModelsKeys;
  src_id: string;
  dst_id: string;
}

export type IDatabase = ReturnType<typeof create_client>;

export default function create_client(
  config: IConfig,
  models_config: IModelMap
) {
  logger.info('initialize db connection');

  if (config.mongodb_debug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      logger.debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });
  }

  if (!config.mongo_uri) {
    logger.error('invalid database uri');
    process.exit(1);
  }

  // Initialize MongoDB connection
  mongoose.connect(config.mongo_uri);

  function get_modal_by_modal_name(model_name: IModelsKeys) {
    const Model = models[model_name];

    if (!Model) {
      throw errors.model_not_found();
    }

    return Model;
  }

  function rename_id(object, old_key = '_id', new_key = 'id') {
    return _(object).omit(old_key).set(new_key, object[old_key]).value();
  }

  const parsed_models_config = parse_modal_config_relations(models_config);
  const models = parse_models(parsed_models_config);

  const db = {
    async get_object(
      { model_name, id }: { model_name: IModelsKeys; id: string },
      // { expand, author } = {}
      options
    ) {
      logger.info('persistence.get_object');

      const Model = get_modal_by_modal_name(model_name);

      logger.info(`start getting ${Model.name} with id ${id}`);

      const fetched_object = await Model.findById(id).lean().exec();

      if (!fetched_object) {
        throw errors.not_found();
      }

      logger.info(`${Model.name} with id ${id} has been fetched successfully`);
      return rename_id(fetched_object);
    },

    async create_object(
      { model_name, ...body },
      // { expand, author } = {}
      options = {}
    ) {
      logger.info('db.create_object');

      const Model = get_modal_by_modal_name(model_name);
      const created_object = await Model.create(rename_id(body, 'id', '_id'));

      return rename_id(created_object._doc);
    },

    async update_object(
      { model_name, id, ...body }: { model_name: IModelsKeys; id: string },
      // { expand, author } = {}
      options = {}
    ) {
      logger.info('db.update_object');
      const Model = get_modal_by_modal_name(model_name);

      const updated_object = await Model.findByIdAndUpdate(id, body, {
        new: true,
      })
        .lean()
        .exec();

      return rename_id(updated_object);
    },

    async delete_object(
      { model_name, id }: { model_name: IModelsKeys; id: string },
      // { expand, author } = {}
      options = {}
    ) {
      logger.info('db.delete_object');

      const Model = get_modal_by_modal_name(model_name);

      const deleted_object = await Model.findByIdAndDelete(id).lean().exec();

      return rename_id(deleted_object);
    },

    async create_relation(relation: IRelation, options) {
      const model_config = models_config[relation.src_model];

      if (!model_config) {
        throw errors.model_not_found();
      }

      // check if relation exists
      if (!model_config.relations[relation.name]) {
        throw errors.invalid_db_relation();
      }

      const Model = models[relation.src_model];

      const result = await Model.updateOne(
        { _id: relation.src_id },
        // @ts-ignore
        { $addToSet: { [relation.name]: relation.dst_id } }
      );

      return result.modifiedCount > 0;
    },
    async delete_relation(relation: IRelation, options) {
      const model_config = models_config[relation.src_model];

      if (!model_config) {
        throw errors.model_not_found();
      }

      // check if relation exists
      if (!model_config.relations[relation.name]) {
        throw errors.invalid_db_relation();
      }

      const Model = models[relation.src_model];

      const result = await Model.updateOne(
        { _id: relation.src_id },
        // @ts-ignore
        { $pull: { [relation.name]: relation.dst_id } }
      );

      return result.modifiedCount > 0;
    },
    async relation_exists(relation: IRelation, options) {
      const model_config = models_config[relation.src_model];

      if (!model_config) {
        throw errors.model_not_found();
      }

      // check if relation exists
      if (!model_config.relations[relation.name]) {
        throw errors.invalid_db_relation();
      }

      const Model = models[relation.src_model]; /*
      const result = await Model.aggregate([
        // { $match: { id: relation.src_id } },
        { $project: { count: { $size: `$${relation.name}` } } },
      ]); */

      const [{ count }] = await Model.aggregate([
        { $match: { _id: relation.src_id } },
        { $project: { count: { $size: `$${relation.name}` } } },
      ]);

      return count > 0;
    },
    async list_relations(relation: IRelation, options) {
      const model_config = models_config[relation.src_model];

      if (!model_config) {
        throw errors.model_not_found();
      }

      const relation_config = model_config.relations[relation.name];
      // check if relation exists
      if (!relation_config) {
        throw errors.invalid_db_relation();
      }

      const Model = models[relation.src_model];
      const DstModel = models[relation_config.type.replace('object:', '')];

      const object = await Model.findById(relation.src_id, [relation.name])
        .populate({
          path: relation.name,
          model: DstModel,
          transform: (doc) => rename_id(doc),
        })
        .lean()
        .exec();

      return object[relation.name];
    },
    truncate: async () => {
      await Promise.all(
        Object.keys(models_config).map(async (model_name: IModelsKeys) => {
          const Model = models[model_name];

          await Model.deleteMany({});
        })
      );
    },
    close: () => {
      return mongoose.connection.close();
    },
  };

  return db;
}
