import * as express from 'express';

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

export default router;
