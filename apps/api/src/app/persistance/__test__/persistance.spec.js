jest.mock('@/config', () => {
  const config = jest.requireActual('@/config').default;

  return {
    ...config,
    mongo_uri: config.test_mongo_uri,
  };
});

import errors from '@/errors';
import * as config from '@/config';
import persistence_lib from '@/persistance';
import queue_lib from '@/queue';
import * as _ from 'lodash';
import '@/persistance/hooks/async-logic';
import '@/persistance/hooks/pre-logic';
import validators from '../validators';
import id_generator from '../utils/id_generator';

describe('persistence', () => {
  /**
   * @type {import('@/persistance/database/mongodb').IDatabase}
   */
  let persistence;
  const id = id_generator();
  /**
   * @type {{[x: string]: IModel}}
   */
  const model_configs = {
    student: {
      config: {},
      fields: {
        name: {
          type: 'string',
          validators: [validators.required()],
        },
        age: {
          type: 'number',
        },
      },
      relations: {
        courses: {
          type: 'object:course',
        },
      },
    },
    class: {
      fields: {
        name: {
          type: 'string',
        },
        date: {
          type: 'date',
        },
        type: {
          type: 'string',
          enum: ['section', 'lecture'],
        },
      },
      relations: {},
    },
    course: {
      fields: {
        name: {
          type: 'string',
        },
        optional: {
          type: 'boolean',
        },
      },
      relations: {
        classes: {
          type: 'object:class',
        },
      },
    },
  };

  beforeAll(async () => {
    // init_persistence
    const queue = await queue_lib(config);
    persistence = await persistence_lib(config, model_configs, queue);
  });

  afterAll(async () => {
    // close db;
    persistence.close();
  });

  beforeEach(async () => {
    // await persistence.truncate();
  });

  describe('create_object', () => {
    const object_body = {
      model_name: 'student',
      name: 'mahmoud',
      age: 24,
    };

    test('fail validation', async () => {
      const create_object = persistence.create_object(
        _.omit(object_body, 'name')
      );

      const expected_error = errors.validation_error(
        expect.arrayContaining([
          {
            field_key: 'name',
            validator_name: 'required',
          },
          {
            field_key: 'name',
            validator_name: 'string',
          },
        ])
      );

      await expect(create_object).rejects.toEqual(expected_error);
    });

    test('fail invalid resource', async () => {
      const create_object = persistence.create_object({
        ...object_body,
        model_name: 'invalid',
      });

      const expected_error = errors.invalid_resource();

      await expect(create_object).rejects.toEqual(expected_error);
    });

    test('create object successfully', async () => {
      const created_object = await persistence.create_object(object_body);

      expect(created_object).toEqual(
        expect.objectContaining({
          name: object_body.name,
          age: object_body.age,
        })
      );

      expect(created_object.id).toBeTruthy();
    });
  });

  describe('get_object', () => {
    test('not found resource', async () => {
      const fetch_object = persistence.get_object({
        model_name: 'student',
        id: id,
      });

      const expected_error = errors.not_found();
      await expect(fetch_object).rejects.toEqual(expected_error);
    });

    test('get object successfully', async () => {
      const created_object = await persistence.create_object({
        model_name: 'student',
        name: 'mahmoud',
        age: 24,
      });

      const fetched_object = await persistence.get_object({
        model_name: 'student',
        id: created_object.id,
      });

      expect(created_object).toEqual(expect.objectContaining(fetched_object));
    });
  });

  describe('update_object', () => {
    test('not found resource', async () => {
      const update_object = persistence.update_object({
        model_name: 'student',
        id: id,
      });

      const expected_error = errors.not_found();
      await expect(update_object).rejects.toEqual(expected_error);
    });

    test('update object successfully', async () => {
      const created_object = await persistence.create_object({
        model_name: 'student',
        name: 'mahmoud',
        age: 24,
      });
      const update = {
        name: 'Ahmed',
      };

      const updated_object = await persistence.update_object({
        model_name: 'student',
        id: created_object.id,
        ...update,
      });

      expect({
        ...created_object,
        ...update,
      }).toEqual(expect.objectContaining(updated_object));
    });
  });

  describe('delete_object', () => {
    test('not found resource', async () => {
      const delete_object = persistence.delete_object({
        model_name: 'student',
        id: id,
      });

      const expected_error = errors.not_found();
      await expect(delete_object).rejects.toEqual(expected_error);
    });

    test('delete object successfully', async () => {
      const created_object = await persistence.create_object({
        model_name: 'student',
        name: 'mahmoud',
        age: 24,
      });

      const deleted_object = await persistence.delete_object({
        model_name: 'student',
        id: created_object.id,
      });
      expect(deleted_object).toEqual(created_object);

      const fetch_object = persistence.get_object({
        model_name: 'student',
        id: created_object.id,
      });

      const expected_error = errors.not_found();
      await expect(fetch_object).rejects.toEqual(expected_error);
    });
  });

  describe('relations', () => {
    const course_body = {
      model_name: 'course',
      name: 'Course 1',
      optional: false,
    };

    const class_body = {
      model_name: 'class',
      name: 'Section 1',
      date: new Date(),
      type: 'section',
    };

    async function create_relation() {
      // create course
      const created_course = await persistence.create_object(course_body);

      // create class
      const created_class = await persistence.create_object(class_body);

      const relation = {
        name: 'classes',
        src_id: created_course.id,
        src_model: 'course',
        dst_id: created_class.id,
      };
      // create relation
      await persistence.create_relation(relation);

      return relation;
    }

    test('should create relation successfully', async () => {
      // create course
      const created_course = await persistence.create_object(course_body);

      // create class
      const created_class = await persistence.create_object(class_body);

      // create relation
      const result = await persistence.create_relation({
        name: 'classes',
        src_id: created_course.id,
        src_model: 'course',
        dst_id: created_class.id,
      });

      expect(result).toBe(true);

      const relation_exists = await persistence.relation_exists({
        name: 'classes',
        src_id: created_course.id,
        src_model: 'course',
        dst: created_class.id,
      });

      expect(relation_exists).toBe(true);
    });

    test('should delete relation', async () => {
      const relation = await create_relation();

      const result = await persistence.delete_relation(relation);
      expect(result).toBe(true);

      const relation_exists = await persistence.relation_exists(relation);

      expect(relation_exists).toBe(false);
    });

    test('should list relation', async () => {
      const relation = await create_relation();

      const result = await persistence.list_relations(relation);
      expect(result).toHaveLength(1);
    });
  });
});
