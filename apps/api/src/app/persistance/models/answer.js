/**
 * @typedef {object} Answer
 * @property {string} type - enum:file,code
 * @property {File} file
 * @property {string} code
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Answer>}
 */
const answer = {
  config: {
    timestamps: true,
  },
  fields: {
    type: {
      type: 'string',
      enum: ['file', 'code'],
    },
    file: {
      type: 'object:file',
    },
    code: {
      type: 'string',
    },
  },
  relations: {},
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default answer;
