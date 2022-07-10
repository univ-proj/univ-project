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
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default student;
