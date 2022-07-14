import { TopicCallback } from '@/queue';
import password from '@/authentication/utils/password';
import logger from '@/logger';

/**
 * Encrypt password on the body
 * @type {TopicCallback<import("libs/typedefs/src").Staff | import("libs/typedefs/src").Student>} event
 */

export default async function rule1(event, metadata) {
  logger.info('triggering rule 1');
  if (event.current.password) {
    logger.info(`hash password`);
    metadata.payload.password = await password.hash(event.current.password);
  }
}
