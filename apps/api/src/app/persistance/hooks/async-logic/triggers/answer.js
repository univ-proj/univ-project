import { TopicCallback } from '@/queue';
import rule3 from '../rules/rule3';

/** @type {TopicCallback<import("libs/typedefs/src").Answer>} */
export async function onPatch(event, metadata) {
  await rule3(event, metadata);
}

/** @type {TopicCallback<import("libs/typedefs/src").Answer>} */
export async function onPost(event, metadata) {
  await rule3(event, metadata);
}
