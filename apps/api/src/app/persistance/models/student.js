/**
 * @typedef Student
 * @property {string} first_name
 *
 */

/**
 *
 * @type {import('./model').IModel<Student>}
 */
const student = {
  config: {
    timestamps: true,
  },
  fields: {
    first_name: {
      type: 'string',
    },
  },
  relations: {
    courses: {
      type: 'object:course',
    },
  },
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default student;
