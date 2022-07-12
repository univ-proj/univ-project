import logger from '@/logger';
import * as _ from 'lodash';
import * as models_config from '@/persistance/models';
import random_entity_body_generator from './utils/random_entity_body_generator';

/**
 *
 * @param {import('@/persistance').IPersistanceDriver} persistence
 * @returns {Promise<void>}
 */
export default async function testing_data(persistence) {
  logger.info('seeders.testing_data');

  if (process.argv[2] !== 'test_data') {
    return;
  }

  await persistence.truncate();

  // add entities
  const generated_objects = {};
  const generators = Object.keys(models_config).map(async (model_key) => {
    const create_promises = Array.from({ length: 1000 }).map(async () => {
      /**@type {import('@/persistance/models/model').IModel} */
      const model_config = models_config[model_key];

      const body = random_entity_body_generator(model_key, model_config);
      const created_object = await persistence.create_object({
        model_name: model_key,
        ...body,
      });

      if (!Array.isArray(generated_objects[model_key])) {
        generated_objects[model_key] = [created_object];
      } else {
        generated_objects[model_key] = [
          ...generated_objects[model_key],
          created_object,
        ];
      }
    });

    await Promise.all(create_promises);
  });

  await Promise.all(generators);

  function get_updates(model_config) {
    return Object.entries(model_config.fields).reduce(
      (acc, [field_name, field]) => {
        const [type, subtype] = field.type.split(':');
        if (type !== 'object') return acc;
        // find field that should be populated

        acc[field_name] = _.sample(generated_objects[subtype]).id;

        return acc;
      },
      {}
    );
  }

  function get_relations(model_config) {
    return Object.entries(model_config.relations).reduce(
      (acc, [relation_name, relation]) => {
        const [_type, subtype] = relation.type.split(':');

        // console.log(relation_name, subtype);

        acc[relation_name] = _.sampleSize(generated_objects[subtype], 3).map(
          (el) => el.id
        );

        return acc;
      },
      {}
    );
  }

  Object.entries(generated_objects).forEach(([model_name, objects]) => {
    const model_config = models_config[model_name];

    objects.forEach(async (object) => {
      const updates = get_updates(model_config);

      await persistence.update_object({
        model_name,
        id: object.id,
        ...updates,
      });
    });
  });

  Object.entries(generated_objects).forEach(([model_name, objects]) => {
    const model_config = models_config[model_name];

    objects.forEach(async (object) => {
      const updates = get_updates(model_config);

      await persistence.update_object({
        model_name,
        id: object.id,
        ...updates,
      });
    });
  });

  Object.entries(generated_objects).forEach(([model_name, objects]) => {
    const model_config = models_config[model_name];

    objects.forEach(async (object) => {
      const relations = get_relations(model_config);

      Object.keys(relations).forEach((relation_key) => {
        const dst_ids = relations[relation_key];

        dst_ids.forEach(async (dst_id) => {
          await persistence.create_relation({
            src_model: model_name,
            src_id: object.id,
            name: relation_key,
            dst_id: dst_id,
          });
        });
      });

      // add 3 courses
      // await persistence.update_object({
      //   model_name,
      //   id: object.id,
      //   ...updates,
      // });

      // await persistence.create_relation();
    });
  });

  // add relations
  // Object.keys(models_config).forEach((model_key) => {
  //   /**@type {import('@/persistance/models/model').IModel} */
  //   const model_config = models_config[model_key];

  //   const { fields, relations } = model_config;

  //   // get fields that starts with object

  // });
}
