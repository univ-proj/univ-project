/**
 * @typedef {object} Attendance
 * @property {boolean} attended
 * @property {Student} student
 * @property {Class} class
 */

/**
 *
 * @type {import('./model').IModel<import('libs/typedefs/src').Attendance>}
 */
const attendance = {
  config: {
    // timestamps: true,
  },
  fields: {
    attended: {
      type: 'boolean',
    },
    student: {
      type: 'object:student',
    },
    class: {
      type: 'object:class',
    },
  },
  relations: {},
  searchable_attributes: [],
  search: {
    filters: [],
  },
};

export default attendance;
