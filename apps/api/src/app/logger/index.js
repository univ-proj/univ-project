import * as winston from 'winston';
import config from '@/config';

const custom_format = winston.format.printf((info) => {
  const { level, message, timestamp, ms, stack = '', service, ...meta } = info;
  const rest = meta[Symbol.for('splat')] || [];

  const stringifiedRest = [message, ...rest]
    .map((el) => (el instanceof Error ? el.stack : JSON.stringify(el)))
    .join(' ');

  return `${timestamp} [${service}] ${level}:${stringifiedRest} (${ms}) ${stack}`;
});

const { combine, timestamp, ms, colorize, errors } = winston.format;

const logger = winston.createLogger({
  level: config.log_level,
  silent: process.env.NODE_ENV === 'test',
  format: combine(
    errors({ stack: true }),
    colorize(),
    timestamp(),
    ms(),
    custom_format
  ),
  defaultMeta: { service: config.service },
  transports: [new winston.transports.Console()],
});

export default logger;
