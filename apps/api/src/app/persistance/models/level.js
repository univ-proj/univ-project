/**
 * @typedef {object} Level
 * @property {string} name
 * @property {array<Program>} programs
 * @property {array<Student>} students
 * @property {array<Group>} groups
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Level>}
 */
const level = {
  config: {
    timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
  },
  relations: {
    programs: {
      type: 'object:program',
    },
    students: {
      type: 'object:student',
    },
    groups: {
      type: 'object:group',
    },
  },
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default level;
