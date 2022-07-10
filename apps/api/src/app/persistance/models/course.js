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
  },
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default course;