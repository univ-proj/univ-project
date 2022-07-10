/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Answer>}
 */
const answer = {
  config: {
    timestamps: true,
  },
  fields: {
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
