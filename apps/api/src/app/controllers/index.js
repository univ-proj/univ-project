import auth_middleware from '@/middlewares/auth_middleware';
import * as express from 'express';
import auth_router from './auth';
import code_router from './code';
import model_router from './model';
import profile_router from './profile';
import relations_router from './relations';

const router = express.Router();

/**
 * Initialize controllers
 */

/**
 * GET /api/healthcheck
 * @summary This is a healthcheck endpoint
 * @return {string} 200 - success response
 */
router.get('/healthcheck', (_, res) => res.status(200).json());
router.use('/auth', auth_router);

// auth middleware
router.use(auth_middleware);

// secured routes
router.use('/profile', profile_router);
router.use('/code', code_router);
router.use(model_router);
router.use(relations_router);

export default router;
