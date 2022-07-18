/**
 * @typedef {object} Group
 * @property {string} name
 * @property {Level} level
 * @property {array<Class>} classes
 * @property {array<Student>} students
 * @property {array<Section>} sections
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Group>}
 */
const group = {
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
    classes: {
      type: 'object:class',
    },
    students: {
      type: 'object:student',
    },
    sections: {
      type: 'object:section',
    },
  },
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default group;
