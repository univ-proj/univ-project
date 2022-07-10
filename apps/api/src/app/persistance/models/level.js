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
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default level;
