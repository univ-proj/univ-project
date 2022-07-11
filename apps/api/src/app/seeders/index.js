import logger from '@/logger';
import testing_data from '@/seeders/testing_data';

/**
 * Seeder driver
 * @param {import("@/persistance").IPersistanceDriver} persistence
 * @returns {Promise<void>}
 */
export default async function create_client(persistence) {
  logger.info('start seeders');
  await testing_data(persistence);
  logger.info('seeders finished successfully');
}
