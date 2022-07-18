import * as PubSub from '@rapid.io/pubsub-js';
import generate_id from '@/persistance/utils/id_generator';

/**
 * @template T
 * @typedef {Object} Event
 * @property {string} id
 * @property {T} previous
 * @property {T} current
 * @property {T} delta
 * @property {object} user
 * @property {Object} metadata Mutable object that can be used to pass data between pre-logic, persistence and post-logic
 */

/**
 * @typedef {Object} EventPublisher
 * @property {EventPublish} async
 * @property {EventPublish} pre
 * @property {EventPublish} post
 */

/**
 * @callback EventPublish
 * @param {import("@/persistence/graph").IObject & import("@/persistence/graph").IEdge} previous
 * @param {import("@/persistence/graph").IObject & import("@/persistence/graph").IEdge} current
 * @param {Object} metadata Mutable object that can be used to pass data between pre-logic, persistence and post-logic
 * @returns {Promise}
 */

/**
 * @typedef {string} Topic Topic is structured like "POST user", "POST user/bookmarks" and so on.
 *
 * Publish a new event
 * @callback PublishEvent
 * @param {Topic} topic
 * @param {} user
 * @returns {EventPublisher}

 * @type {PublishEvent}
 */
function publish_event(topic, user, fake_async) {
  // fake_async property is not document in JSDoc, because it is internal and not available for usage
  const id = generate_id();

  const generate_event = (previous, current) => ({
    id,
    previous,
    current,
    user,
  });

  return {
    async: async (previous, current, metadata) => {
      const body = {
        event: generate_event(previous, current),
        metadata,
      };

      if (fake_async === 'true' || fake_async === true) {
        await PubSub.publishAwait(`ASYNC.${topic}`, body);
      } else {
        PubSub.publish(`ASYNC.${topic}`, body);
      }
    },
    pre: (previous, current, metadata) =>
      PubSub.publishAwait(`PRE.${topic}`, {
        event: generate_event(previous, current),
        metadata,
      }),
    post: (previous, current, metadata) =>
      PubSub.publishAwait(`POST.${topic}`, {
        event: generate_event(previous, current),
        metadata,
      }),
  };
}

/**
 * @template T
 * @callback TopicCallback
 * @param {Event<T>} event
 * @param {{ payload: T }} metadata Mutable object that can be used to pass data between pre-logic, persistence and post-logic
 * @param {string} topic
 */

/**
 * Subscribe to sync/async events
 * @date 2021-04-07
 * @callback SubscribeToTopic
 * @param {Topic} topic
 * @param {'pre'|'post'|'async'} type
 * @param {TopicCallback<any>} cb
 *
 * @type {SubscribeToTopic}
 */
function subscribe_to_topic(topic, type, cb) {
  const prefix = `${type.toUpperCase()}.`;
  PubSub.subscribe(`${prefix}${topic}`, (topic, data) =>
    cb(data.event, data.metadata, topic)
  );
}

/**
 * Initialize all subscribers
 * @callback SubscribeToTopics
 * @param {Object.<Topic, TopicCallback>} config
 * @param {'pre'|'post'|'async'} type
 * @returns {void}
 *
 * @type {SubscribeToTopics}
 */
function subscribe_to_topics(config, type) {
  const topics = Object.keys(config);
  for (const topic of topics) {
    subscribe_to_topic(topic, type, config[topic]);
  }
}

/**
 * @typedef {Object} IEventQueueDriver
 * @property {PublishEvent} publish_event
 * @property {SubscribeToTopic} subscribe_to_topic
 * @property {SubscribeToTopics} subscribe_to_topics
 *
 * Create event queue clinet
 * @param {Object} object
 * @param {Boolean} object.fake_async_queue Await async events for easy testing
 * @returns {IEventQueueDriver}
 */
export default function create_client({ fake_async_queue } = {}) {
  return {
    publish_event: (topic, author) =>
      publish_event(topic, author, fake_async_queue),
    subscribe_to_topic,
    subscribe_to_topics,
  };
}
