import * as express from 'express';
import { workers } from '@/components';

const code_router = express.Router();

/**
 * @typedef {object} RunCodeRequest
 * @property {string} code
 *
 */

/**
 * POST /api/code/{engine_name}/run
 * @tags Code
 * @description run code snippet
 * @summary run code snippet
 * @security BearerAuth
 * @param {string} engine_name.path.required - enum:python,javascript
 * @param {RunCodeRequest} request.body.required - code body - application/json
 * @return {string} 200 - success response
 */
code_router.post('/:engine_name/run', async (req, res) => {
  const { engine_name } = req.params;

  const result = await workers.code_runner.run({
    env: engine_name,
    code: req.body.code,
  });

  res.status(200).json(result);
});

export default code_router;
