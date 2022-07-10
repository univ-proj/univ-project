/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Quiz>}
 */
const quiz = {
  config: {
    // timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
    class: {
      type: 'object:class',
    },
    type: {
      type: 'string',
      enum: ['file', 'code'],
    },
    file: {
      type: 'object:file',
    },
    code_description: {
      type: 'object:code_description',
    },
  },
  relations: {
    answers: {
      type: 'object:answer',
    },
  },
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default quiz;
