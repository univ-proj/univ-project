import { TopicCallback } from '@/queue';
import rule2 from '../rules/rule2';

/** @type {TopicCallback<import("libs/typedefs/src").Answer>} */
export async function onPatch(event, metadata) {
  await rule2(event, metadata);
}

/** @type {TopicCallback<import("libs/typedefs/src").Answer>} */
export async function onPost(event, metadata) {
  await rule2(event, metadata);
}
