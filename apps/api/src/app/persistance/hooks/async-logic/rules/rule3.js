import { TopicCallback } from '@/queue';
import logger from '@/logger';
import { persistance } from '@/components';

/**
 * create relation between answer and assignment
 * @type {TopicCallback<import("libs/typedefs/src").Answer>} event
 */

export default async function rule1(event, metadata) {
  logger.info('triggering rule 3');

  await persistance.create_relation(
    {
      src_model: 'assignment',
      src_id: event.current.assignment,
      dst_id: event.current.id,
      name: 'answers',
    },
    { user: event.user }
  );
}
