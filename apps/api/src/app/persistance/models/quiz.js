/**
 * @typedef {object} Quiz
 * @property {string} name
 * @property {Class} class
 * @property {string} type  - enum:file,code
 * @property {File} file
 * @property {CodeDescription} code_description
 * @property {array<Answer>} answers
 */

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
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default quiz;
