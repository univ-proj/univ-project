/**
 * @typedef {object} Staff
 * @property {string} name
 * @property {string} phone
 * @property {string} birth_date - date of birth - date
 * @property {string} gender - enum:male,female
 * @property {string} address
 * @property {string} email
 * @property {string} password
 * @property {array<Course>} courses
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Staff>}
 */
const staff = {
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
  },
  relations: {
    courses: {
      type: 'object:course',
    },
  },
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default staff;
