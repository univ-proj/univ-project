/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').File>}
 */
const file = {
  config: {
    // timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    mime_type: {
      type: 'string',
      // images, pdf
    },
  },
  relations: {},
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default file;
