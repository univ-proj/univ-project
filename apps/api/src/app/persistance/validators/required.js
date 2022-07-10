import * as _ from 'lodash';

export default () => {
  return function required(val) {
    return !_.isNil(val);
  };
};
