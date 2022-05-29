/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import config from '@/config';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = config.port || 3000;
const server = app.listen(port, config.host, () => {
  console.log(`Listening at http://${config.host}:${port}/api`);
});
server.on('error', console.error);
