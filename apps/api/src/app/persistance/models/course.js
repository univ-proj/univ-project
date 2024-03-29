/**
 * @typedef {object} Course
 * @property {string} name
 * @property {boolean} optional
 * @property {Program} program
 * @property {array<Class>} classes
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Course>}
 */
const course = {
  config: {
    timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
    optional: {
      type: 'boolean',
    },
    program: {
      type: 'object:program',
    },
  },
  relations: {
    classes: {
      type: 'object:class',
    },
    assignments: {
      type: 'object:assignment',
    },
    quizzes: {
      type: 'object:quiz',
    },
  },
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default course;
