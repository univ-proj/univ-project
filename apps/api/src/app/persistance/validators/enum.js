import * as _ from 'lodash';

export default (enums) => {
  return function enum_validator(val) {
    return _.includes(enums, val);
  };
};
