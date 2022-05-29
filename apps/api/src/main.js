/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import config from '@/config';
import logger from '@/logger';
import error_handler from '@/middlewares/error_handler';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use(error_handler);

const port = config.port || 3000;
const server = app.listen(port, config.host, () => {
  logger.info(`Listening at http://${config.host}:${port}/api`);
});
server.on('error', logger.error);
