/**
 * @typedef Course
 * @property {string} student
 *
 */

/**
 *
 * @type {import('./model').IModel<Student>}
 */
const student = {
  config: {
    // timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
  },
  relations: {},
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default student;
