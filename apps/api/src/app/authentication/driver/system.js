import logger from '@/logger';
import jwt from 'jsonwebtoken';

/**
 *
 * @param {import('@/config').IConfig} config
 * @returns {import("@/authentication").IAuthDriver}
 */
export default function create_client(config, persistance) {
  return {
    login: async (email, password) => {
      // get email and password
      // return token
    },
    // register: async () => {

    // },
    validate_token: async (token) => {
      try {
        const resolved_token = jwt.verify(
          token,
          config.system_auth_token_secret
        );
        logger.info('token verified');
        return resolved_token;
      } catch (e) {
        logger.error('invalid token', e);
        return false;
      }
    },
  };
}
