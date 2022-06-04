// import errors from '@/errors';
import logger from '@/logger';
// import local_cache from '@/persistance/cache/local';
import mongodb from '@/persistance/database/mongodb';

// import _ from 'lodash';

/**
 * @typedef {keyof typeof import('@/persistance/models')} IModalKeys
 */

const database_drivers = {
  mongodb,
};

export default function create_client(config, models) {
  logger.info('initializing persistence');

  logger.info('initializing database driver');

  /** @type {IDatabseDriver} */
  const database_driver = database_drivers[config.database];

  if (!database_driver) {
    logger.error('database driver not selected, please check your env file');
    process.exit();
  }

  logger.info('selected database driver', { driver: config.database });

  /** @type {IDatabseDriver} */
  const db = database_driver(config, models);

  logger.info('initializing local cache');
  // const _local_cache = local_cache();

  logger.info('initialized local cache');

  /** @type {Object.<string, ICacheDriver>} */
  const cachers = {
    // local: _local_cache
  };

  logger.info('persistence drivers initialized');

  /** @type {IPersistenceDriver & ICacheDriver} */
  const persistence = {};
  return persistence;
}
