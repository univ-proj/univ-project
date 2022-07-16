import * as path from 'path';

import logger from '@/logger';
import { Piscina } from 'piscina';
import code_runner from '@/workers/code_runner';

/**
 *
 * @param {import('@/config').IConfig} config
 * @returns {{code_runner: import('@/workers/code_runner').ICodeRunnerDriver})}
 */
export default function create_client(config) {
  logger.info('creating worker driver');

  function register_worker(worker_name) {
    logger.info(`register worker ${worker_name}`);
    const piscina = new Piscina({
      filename: path.resolve(__dirname, `./${worker_name}/index.js`),
    });

    return async (args = {}) => {
      logger.info(`calling ${worker_name}`);
      const result = await piscina.run(args);
      return result;
    };
  }

  // register workers
  return {
    code_runner:
      process.env.NODE_ENV === 'development'
        ? code_runner
        : register_worker('code_runner'),
  };
}
