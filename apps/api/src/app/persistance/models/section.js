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
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default section;
