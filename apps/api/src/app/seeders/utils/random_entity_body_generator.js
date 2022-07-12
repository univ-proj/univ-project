import { faker } from '@faker-js/faker';
import * as _ from 'lodash';

const generator_mapper = {
  name: faker.random.word,
  phone: faker.phone.number,
  birth_date: faker.date.birthdate,
  gender: () => _.sample(['male', 'female']),
  address: faker.address.country,
  email: faker.internet.email,
  password: faker.internet.password,

  // TODO: replace with markdown
  description: faker.random.words,
  initial_tests: faker.random.words,
  initial_code_snippet: faker.random.words,
  tests: faker.random.words,
  code: faker.random.words,
  optional: faker.datatype.boolean,
  attended: faker.datatype.boolean,

  type: (type = 'assignment') =>
    type === 'assignment'
      ? _.sample(['code', 'file'])
      : _.sample(['lecture', 'section']),

  url: faker.internet.url,
  mime_type: () => 'application/pdf',

  date: () => _.sample([faker.date.future(), faker.date.past()]),

  canceled: faker.datatype.boolean,
  location: faker.random.word,
};

/**
 *
 * @param {import('@/persistance/models/model').IModel} model_config
 */

export default function random_entity_body_generator(model_name, model_config) {
  return Object.entries(model_config.fields).reduce(
    (acc, [field_name, field]) => {
      if (field.type.startsWith('object:')) return acc;
      if (field_name === 'type') {
        acc[field_name] = generator_mapper[field_name](
          model_name !== 'class' ? 'assignment' : null
        );

        return acc;
      }
      acc[field_name] = generator_mapper[field_name]();

      return acc;
    },
    {}
  );
}
