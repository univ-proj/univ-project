import * as express from 'express';
import { system_auth } from '@/components';

const auth_router = express.Router();

/**
 * @typedef {object} LoginRequest
 * @property {string} email
 * @property {string} password
 * @property {string} role - enum:student|staff
 *
 */

/**
 * @typedef {object} LoginResponse
 * @property {string} token
 * @property {oneOf|Student|Staff} user
 *
 */

/**
 * POST /api/auth/login
 * @tags Auth
 * @description login user with specific role
 * @summary login user
 * @param {LoginRequest} request.body.required - login credentials - application/json
 * @return {LoginResponse} 200 - success response
 */
auth_router.post('/login', async (req, res, next) => {
  const result = await system_auth.login(
    req.body.email,
    req.body.password,
    req.body.role
  );

  res.json(result);
});

export default auth_router;
