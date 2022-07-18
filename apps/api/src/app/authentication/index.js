import { IConfig } from '@/config';
import logger from '@/logger';
import system from '@/authentication/driver/system';

/**
 * @typedef {Object} IAuthDriver
 * @property {IRegisterUser} register
 * @property {ILoginUser} login
 * @property {IValidateUserToken} validate_token
 *
 *
 * @callback IRegisterUser
 * @returns {Promise<void>}
 *
 * @callback ILoginUser
 * @param {{ username?: string, password?: string, role?:'student'|'staff' }} params
 * @returns {Promise<{token: string, user: object, role: 'student'|'staff'}>}
 *
 * @callback ILoginAsGuest
 * @returns {Promise<ILoginResponse>}
 *
 * @typedef {Object} IValidateTokenResponse
 * @property {string} [id]
 * @property {string} [role]
 *
 *
 * @callback IValidateUserToken
 * @param {string} token
 * @returns {Promise<IValidateTokenResponse>}
 *
 * Initialize authentication driver
 * @param {IConfig} config
 * @returns {IAuthDriver}
 */
export default function create_client(config, persistance) {
  logger.info('initializing authentication driver');

  /** @type {IAuthDriver} */
  let driver;

  if (config.auth_driver === 'system') {
    driver = system(config, persistance);
  } else {
    logger.error('authentication driver not selected');
    process.exit();
  }

  return driver;
}
