import * as express from 'express';
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

router.use(model_router);
router.use(relations_router);

export default router;
