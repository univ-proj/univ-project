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
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default program;