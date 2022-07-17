import * as express from 'express';
import { persistance } from '@/components';

const profile_router = express.Router();

/**
 * @typedef {object} ProfileResponse
 * @property {oneOf|Student|Staff} user
 * @property {string} role - enum:staff,student
 */

/**
 * GET /api/profile
 * @tags Profile
 * @description Get users profile
 * @summary user profile
 * @security BearerAuth
 * @param {string} expand.query - expand
 * @return {ProfileResponse} 200 - success response
 */
profile_router.get('/', async (req, res, next) => {
  const user = await persistance.get_object(
    { model_name: req.user.role, id: req.user.id },
    { expand: req.expand, user: req.user }
  );

  res.json({ user, role: req.user.role });
});

export default profile_router;
