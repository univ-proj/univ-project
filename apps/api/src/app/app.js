/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import error_handler from '@/middlewares/error_handler';
import controllers from '@/controllers';
import '@/components';

const app = express();

app.use('/api', controllers);
app.use(error_handler);

export default app;
