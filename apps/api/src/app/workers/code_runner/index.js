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

import logger from '@/logger';
import * as engines from './engines';

export default async function run({ code, env }) {
  logger.info(`run code on env ${env}`);

  return await engines[env].run(code);
}
