import mongoose from 'mongoose';
import logger from '@/logger';

export default function create_client(config, models) {
  logger.info('initialize db connection');

  if (config.mongodb_debug) {
    mongoose.set('debug', true);
  }

  if (!config.mongo_uri) {
    logger.error('invalid database uri');
    // TODO: throw exception
    throw new Error('invalid database uri');
  }

  // Initialize MongoDB connection
  const connection = mongoose.createConnection(config.mongo_uri, {
    useNewUrlParser: true,
    loggerLevel: 'debug',
    logger,
  });

  // parse and create models
  async function parse_models(models) {
    // console.log(models);
    Object.entries(models).forEach(([model_key, model]) => {
      const model_schema = new mongoose.Schema(model.fields, model.config);
      mongoose.model(model_key, model_schema);
    });
  }

  connection.asPromise();
  parse_models(models);

  return {
    close: () => {
      return connection.close();
    },
  };
}
