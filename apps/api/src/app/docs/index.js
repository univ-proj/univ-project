import * as path from 'path';
import * as jsdoc_swagger from 'express-jsdoc-swagger';
import * as glob from 'glob';

import config from '@/config';
import logger from '@/logger';

/**
 * Initializes Swagger and serve UI documentation for the API
 */

export const init = (app) => {
  const documentation_path = 'swagger/docs';
  const options = {
    info: {
      version: config.api_version,
      title: 'Student Management System API Documentation',
      license: {
        name: 'MIT',
        // url: 'http://example.com',
      },
      description: 'Example for the Student Management System',
      contact: {
        name: 'Mahmoud Elzoka',
        // url: 'http://example.com',
        email: 'mahmoudelzoka@gmail.com',
      },
      // termsOfService: 'http://example.com',
    },
    servers: [
      {
        url: '{protocol}://{host}:{port}',
        description: 'local server for development process',
        variables: {
          port: {
            default: config.port,
          },
          host: {
            default: config.host,
          },
          protocol: {
            enum: ['http', 'https'],
            default: config.protocol,
          },
        },
      },
      {
        url: '{protocol}://dev.{host}:{port}',
        description: 'The API server',
        variables: {
          port: {
            default: config.port,
          },
          host: {
            default: config.host,
          },
          protocol: {
            enum: ['http', 'https'],
            default: config.protocol,
          },
        },
      },
    ],
    security: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    filesPattern: [
      ...glob.sync(
        `${path.normalize(
          __dirname + '/../../../apps/api/src/app/controllers'
        )}/*.js`
      ),
      ...glob.sync(
        `${path.normalize(
          __dirname + '/../../../apps/api/src/app/persistance/models'
        )}/*.js`
      ),
    ],

    // filesPattern: './main.js',
    // filesPattern: ['./**/*.route.js'],
    baseDir: __dirname,
    // URL where SwaggerUI will be rendered
    swaggerUIPath: `/${documentation_path}`,
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
  };

  logger.info(
    `serve api documentation: ${config.protocol}://${config.host}:${config.port}/${documentation_path}`
  );

  jsdoc_swagger(app)(options);
};
