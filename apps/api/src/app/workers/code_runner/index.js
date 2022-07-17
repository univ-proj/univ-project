/**
 * @typedef {Object} ICodeRunnerDriver
 * @property {RunCode} run
 *
 * Runs Code
 * @callback RunCode
 * @returns {Promise<void>}
 *
 *
 * Create Resume builder driver
 * @param {IConfig} config
 * @returns {IResumeDriver}
 */

import errors from '@/errors';
import logger from '@/logger';
import * as engines from './engines';

export async function run({ code, env }) {
  logger.info(`run code on env ${env}`);

  if (!engines[env]) {
    throw errors.engine_not_supported({ engine_name: env });
  }

  return await engines[env].run(code);
}
