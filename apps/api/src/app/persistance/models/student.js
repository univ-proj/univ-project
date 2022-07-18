/**
 * @typedef {object} Student
 * @property {string} name
 * @property {string} phone
 * @property {string} birth_date - date of birth - date
 * @property {string} gender - enum:male,female
 * @property {string} address
 * @property {string} email
 * @property {string} password
 * @property {Level} level
 * @property {Program} program
 * @property {Group} group
 * @property {Section} section
 * @property {array<Attendance>} attendance
 * @property {array<Course>} courses
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Student>}
 */
const student = {
  config: {
    timestamps: true,
  },
  fields: {
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    birth_date: {
      type: 'date',
    },
    gender: {
      type: 'string',
      enum: ['male', 'female'],
    },
    address: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    level: {
      type: 'object:level',
    },
    program: {
      type: 'object:program',
    },
    group: {
      type: 'object:group',
    },
    section: {
      type: 'object:section',
    },
  },
  relations: {
    attendance: {
      type: 'object:attendance',
    },
    courses: {
      type: 'object:course',
    },
  },
  searchable_attributes: ['name'],
  search: {
    filters: ['email'],
  },
};

export default student;
