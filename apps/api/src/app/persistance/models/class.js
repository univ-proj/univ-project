/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Class>}
 */
const class_schema = {
  config: {
    // timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
    date: {
      type: 'date',
    },
    type: {
      type: 'string',
      enum: ['section', 'lecture'],
    },
    canceled: {
      type: 'boolean',
    },
    location: {
      type: 'string',
    },
    course: {
      type: 'object:course',
    },
    group: {
      type: 'object:group',
    },
    section: {
      type: 'object:section',
    },
    lecturer: {
      type: 'object:staff',
    },
  },
  relations: {
    attendance: {
      type: 'object:attendance',
    },
    assignments: {
      type: 'object:assignment',
    },
    quizzes: {
      type: 'object:quiz',
    },
    files: {
      type: 'object:file',
    },
  },
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default class_schema;
