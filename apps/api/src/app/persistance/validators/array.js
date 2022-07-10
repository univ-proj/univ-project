import * as _ from 'lodash';
import validators, { runFieldsValidators } from '@/persistance/validators';

export default () => {
  return function array(val, type, schema) {
    const is_valid_array = _.isArray(val);

    if (!is_valid_array) {
      return false;
    }

    // check if is primitive type
    return val.every((el) => {
      if (type === 'object') {
        return runFieldsValidators(schema, el);
      }

      return validators._types[type]()(el);
    });
  };
};
