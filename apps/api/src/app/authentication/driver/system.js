import errors from '@/errors';
import logger from '@/logger';
import password from '../utils/password';
import token from '../utils/token';

/**
 *
 * @param {import('@/config').IConfig} config
 * @param {import('@/persistance').IPersistanceDriver} persistance
 * @returns {import("@/authentication").IAuthDriver}
 */
export default function create_client(config, persistance) {
  return {
    login: async (email, pass = '', role) => {
      // get email and password
      const {
        results,
        pagination: { count },
      } = await persistance.listing(role, {
        filters: `email:${email}`,
      });

      if (count < 1) {
        throw errors.user_does_not_exist();
      }

      const [user] = results;

      // compare password
      const is_correct_password = await password.compare(pass, user.password);
      if (!is_correct_password) {
        throw errors.invalid_credentials();
      }

      // generate token
      return token.sign({ id: user.id, role });
    },
    // register: async () => {

    // },
    validate_token: async (token_value) => {
      try {
        const resolved_token = token.verify(
          token_value,
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
