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
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default answer;
