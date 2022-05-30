import app from '@/app';
import config from '@/config';
import logger from '@/logger';
import * as docs from '@/docs';

const port = config.port || 3000;
app.listen(port, config.host, () => {
  logger.info(`Listening at ${config.protocol}://${config.host}:${port}/api`);
  docs.init(app);
});
