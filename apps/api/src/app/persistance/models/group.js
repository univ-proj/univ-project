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
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default group;
