/**
 * @typedef {object} Section
 * @property {string} name
 * @property {Course} course
 * @property {Group} group
 * @property {array<Class>} classes
 * @property {array<Student>} students
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Section>}
 */
const section = {
  config: {
    timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
    course: {
      type: 'object:course',
    },
    group: {
      type: 'object:group',
    },
  },
  relations: {
    classes: {
      type: 'object:class',
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

export default section;
