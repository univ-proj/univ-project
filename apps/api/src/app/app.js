/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import 'express-async-errors';
import * as cors from 'cors';
import error_handler from '@/middlewares/error_handler';
import controllers from '@/controllers';
import * as bodyParser from 'body-parser';
import '@/components';
import '@/persistance/hooks/pre-logic';
import '@/persistance/hooks/async-logic';

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api', controllers);

// error handler
app.use(error_handler);

export default app;
