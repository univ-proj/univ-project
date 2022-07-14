/**
 * @typedef {object} Class
 * @property {string} name
 * @property {string} date - start date - date
 * @property {string} type - enum:section,lecture
 * @property {boolean} canceled
 * @property {string} location
 * @property {Course} course
 * @property {Group} group
 * @property {Section} section
 * @property {Staff} lecturer
 * @property {array<Attendance>} attendance
 * @property {array<Assignment>} assignments
 * @property {array<Quiz>} quizzes
 * @property {array<File>} files
 */

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
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default class_schema;
