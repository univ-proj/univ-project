/**
 * @typedef {object} CodeDescription
 * @property {string} description
 * @property {string} initial_tests
 * @property {string} initial_code_snippet
 * @property {string} tests
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').CodeDescription>}
 */
const code_description = {
  config: {
    // timestamps: true,
  },
  fields: {
    description: {
      type: 'string',
      // Markdown
    },
    initial_tests: {
      type: 'string',
    },
    initial_code_snippet: {
      type: 'string',
    },
    tests: {
      type: 'string',
    },
  },
  relations: {},
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default code_description;
