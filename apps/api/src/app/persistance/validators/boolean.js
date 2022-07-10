import * as _ from 'lodash';

/**
 *
 */
export default () => {
  return function boolean(val) {
    return _.isBoolean(val);
  };
};
