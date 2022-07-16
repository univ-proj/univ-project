import { system_auth } from '@/components';
import errors from '@/errors';
import logger from '@/logger';

/**
 * @type {import('express').Handler}
 */
export default async function auth_middleware(req, res, next) {
  logger.info('check authentication');

  logger.info('check authentication header exists');
  const auth_header = req.headers.authorization;

  if (!auth_header) {
    throw errors.token_required();
  }

  logger.info('extract token');
  const [, token] = auth_header.split('Bearer ');

  logger.info('validate token');

  const resolved_token = await system_auth.validate_token(token);

  if (!resolved_token) {
    throw errors.invalid_token();
  }

  req.user = {
    id: resolved_token.id,
    role: resolved_token.role,
  };

  logger.info('token is valid with author', req.user);

  await next();
}