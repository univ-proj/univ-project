import { TopicCallback } from '@/queue';
import logger from '@/logger';

/**
 * Set student id to author
 * @type {TopicCallback<import("libs/typedefs/src").Answer>} event
 */

export default async function rule1(event, metadata) {
  logger.info('triggering rule 2');

  metadata.payload.student = event.user.id;
}
