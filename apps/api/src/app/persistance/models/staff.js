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
  sortable_fields: [],
  search: {
    filters: [],
  },
};

export default staff;
