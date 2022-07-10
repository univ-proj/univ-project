import * as dotenv from 'dotenv';

/**
 *
 * Configuration object
 * @typedef {Object} IConfig
 * @property {string} protocol connection protocol
 * @property {string} host Network interface to listen on
 * @property {number} port The port the project runs on locally
 * @property {string} service The service running
 * @property {string} log_level The log level
 * @property {string} api_version The API version
 * @property {string} database The specified database
 * @property {string} mongodb_debug Is debug mode enabled
 * @property {string} mongo_uri database uri
 * @property {string} expands_options_default_limit Expands options default limit
 * @property {"asc"|"desc"} expands_options_default_sort_type Expands options default sort type

 */

dotenv.config();

/** @type {IConfig} */
const config = {};

const env_values = Object.keys(process.env).map((key) => ({
  key: key.toLowerCase(),
  value: process.env[key],
}));

const prefix = 'api_';
const explicit_env_vars = [];

env_values
  .filter(
    ({ key }) => key.startsWith(prefix) || explicit_env_vars.includes(key)
  )
  .map(({ key, value }) => ({ key: key.replace(prefix, ''), value }))
  .forEach(({ key, value }) => (config[key] = value));

export default config;
