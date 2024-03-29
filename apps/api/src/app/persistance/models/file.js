/**
 * @typedef {object} File
 * @property {string} name
 * @property {string} url
 * @property {string} mime_type
 */

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
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default file;
