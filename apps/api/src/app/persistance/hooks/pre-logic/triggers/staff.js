import { TopicCallback } from '@/queue';
import rule1 from '../rules/rule1';

/** @type {TopicCallback<import("libs/typedefs/src").Staff>} */
export async function onPatch(event, metadata) {
  await rule1(event, metadata);
}

/** @type {TopicCallback<import("libs/typedefs/src").Staff>} */
export async function onPost(event, metadata) {
  await rule1(event, metadata);
}
