import auth_middleware from '@/middlewares/auth_middleware';
import * as express from 'express';
import auth_router from './auth';
import model_router from './model';
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

router.use(auth_middleware);
router.use(model_router);
router.use(relations_router);

export default router;
