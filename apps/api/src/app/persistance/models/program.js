/**
 * @typedef {object} Program
 * @property {string} name
 * @property {Level} level
 * @property {array<Course>} courses
 * @property {array<Student>} students
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Program>}
 */
const program = {
  config: {
    timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
    level: {
      type: 'object:level',
    },
  },
  relations: {
    courses: {
      type: 'object:course',
    },
    students: {
      type: 'object:student',
    },
  },
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default program;
