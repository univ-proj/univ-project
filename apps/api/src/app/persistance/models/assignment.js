/**
 * @typedef {object} Assignment
 * @property {string} name
 * @property {Class} class
 * @property {string} type - enum:code,file
 * @property {File} file
 * @property {CodeDescription} code_description
 * @property {array<Answer>} answers
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Assignment>}
 */
const assignment = {
  config: {
    // timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
    course: {
      type: 'object:course',
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

export default assignment;
