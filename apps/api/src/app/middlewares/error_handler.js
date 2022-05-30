import logger from '@/logger';
import errors from '@/errors';
import error_messages from '@/errors/error_messages.json';

/**
 * Strip unwanted fields from error
 * @date 2021-05-01
 * @param {import("errors/create_error").IAPIError} err
 * @returns {import("errors/create_error").IAPIError}
 */
export function extract_error({ ctx, spans, ...err }) {
  return err;
}

/**
 * Identify which locale the user is requesting
 * @date 2021-04-11
 * @param {import("errors/create_error").IAPIError} err
 * @param {express.Request} req
 * @returns {import("errors/create_error").IAPIError}
 */
function serialize_error(error) {
  return {
    ...extract_error(error),
    message: error_messages[error.code],
  };
}

/**
 * Catch all uncaught errors
 * @date 2021-04-24
 * @param {Error} err
 * @returns {Promise<void>}
 */
function log_uncaught_error(error) {
  const err = extract_error(error);

  logger.error('An unknown error occurred', {
    stack: err.stack,
    message: err.message,
  });
}

/**
 * Identify which locale the user is requesting
 * @date 2021-04-11
 * @param {import("errors/create_error").IAPIError|Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export default function error_handler(err, req, res, next) {
  if (err.ctx) {
    logger.error(err);
  }

  // log error if there is no context logger
  if (!err.ctx && err.api_error) {
    logger.error('An unknown API error occurred', extract_error(err));
  }

  // send response
  if (err.api_error) {
    return res.status(err.status_code).json(serialize_error(err, req));
  }

  log_uncaught_error(err);

  res
    .status(errors.unknown_error().status_code)
    .json(serialize_error(errors.unknown_error(), req));

  return next();
}

process.on('uncaughtException', log_uncaught_error);
process.on('unhandledRejection', log_uncaught_error);
