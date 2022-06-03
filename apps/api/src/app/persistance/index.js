import errors from '@/errors';
import logger from '@/logger';
// import local_cache from '@/persistance/cache/local';
import mongodb from '@/persistance/database/mongodb';

import _ from 'lodash';

/**
 * Cache Level
 * @typedef {"local"|"external"} ICacheLevel
 *
 * Extend Cache Driver functions params to choose cache level
 * @typedef {Object} IPersistenceCacheDriver
 * @property {IPersistenceCacheSet} set
 * @property {IPersistenceCacheGet} get
 * @property {IPersistenceCacheMultipleGet} mget
 * @property {IPersistenceCacheMultipleSet} mset
 * @property {IPersistenceCacheDelete} del
 *
 * Get data from cache by key
 * @callback IPersistenceCacheGet
 * @param {ICacheLevel} cache_level
 * @param {string} key
 * @returns {Promise<any>}
 *
 * Set data of a key in cache
 * @callback IPersistenceCacheSet
 * @param {ICacheLevel} cache_level
 * @param {string} key
 * @param {any} data
 * @returns {Promise<void>}
 *
 * Get data of multiple keys from cache
 * @callback IPersistenceCacheMultipleGet
 * @param {ICacheLevel} cache_level
 * @param {string[]} keys
 * @returns {Promise<Object.<string, any>>}
 *
 * set data of multiple keys from cache
 * @callback IPersistenceCacheMultipleSet
 * @param {ICacheLevel} cache_level
 * @param {[{key: number|string, val: any}]} data
 * @returns {Promise<boolean>}
 *
 *
 * Delete data of a key in cache
 * @callback IPersistenceCacheDelete
 * @param {ICacheLevel} cache_level
 * @param {string|string[]} key
 * @returns {Promise<number>}
 *
 *
 * Interface for interacting with the data
 * @typedef {Object} ICacheDriver
 * @property {CacheSet} set
 * @property {CacheGet} get
 * @property {CacheMultipleGet} mget
 * @property {CacheMultipleSet} mset
 * @property {CacheDelete} del
 *
 * Get data from cache by key
 * @callback CacheGet
 * @param {string} key
 * @returns {Promise<any>}
 *
 * Set data of a key in cache
 * @callback CacheSet
 * @param {string} key
 * @param {any} data
 * @returns {Promise<void>}
 *
 * Get data of multiple keys from cache
 * @callback CacheMultipleGet
 * @param {string[]} keys
 * @returns {Promise<Object.<string, any>>}
 *
 * set data of multiple keys from cache
 * @callback CacheMultipleSet
 * @param {[{key: number|string, val: any}]} data
 * @returns {Promise<boolean>}
 *
 * Delete data of a key in cache
 * @callback CacheDelete
 * @param {string|string[]} key
 * @returns {Promise<number>}
 *
 */

/**
 * Interface for interacting with the data
 * @typedef {Object} IDatabseDriver
 * @property {GetObject} get_object
 * @property {BulkGetObjects} bulk_get_objects
 * @property {BulkDeleteObjects} bulk_delete_objects
 * @property {CreateObject} create_object
 * @property {UpdateObject} update_object
 * @property {DeleteObject} delete_object
 * @property {CreateEdge} create_edge
 * @property {DeleteEdge} delete_edge
 * @property {EdgeExists} edge_exists
 * @property {UpdateEdgeSortValue} update_edge_sort_value
 * @property {ListEdges} list_edges
 * @property {TruncateTable} truncate_table
 * @property {CloseConnection} close
 *
 * @typedef IExpand
 * @property {string} field_name
 * @property {string} table_name
 * @property {{sort_type: "asc"|"desc", limit: number}} [options]
 * @property {string[]} [views=[]]
 * @property {IExpands} expands
 *
 * @typedef IExpands
 * @property {IExpand[]} fields
 * @property {IExpand[]} edges
 *
 * @typedef {Object} PersistenceMethodOptions
 * @property {import('persistence/graph').Author} author
 * @property {string[]} views_names
 * @property {'bidirectional'|'reverse'|'directional'} edge_mode
 * @property {IExpands} expand
 * @property {Boolean} ignore_processing
 *
 * @callback GetObject
 * @param {TracingContext} _ctx
 * @param {string} object_id
 * @param {PersistenceMethodOptions} options
 * @returns {import("persistence/graph").IObject}
 *
 * @callback BulkGetObjects
 * This method fetches multiple objects of the same object type, if passed ids of different object types, you might get inconsistent and invalid results.
 * @param {TracingContext} _ctx
 * @param {string[]} object_ids
 * @param {PersistenceMethodOptions} options
 * @returns {import("persistence/graph").IObject[]}
 *
 * @callback BulkDeleteObjects
 * @param {TracingContext} _ctx
 * @param {string[]} object_ids
 * @param {PersistenceMethodOptions} options
 * @returns {import("persistence/graph").IObject}
 *
 * @callback CreateObject
 * @param {TracingContext} _ctx
 * @param {import("persistence/graph").IObject} body
 * @param {PersistenceMethodOptions} options
 * @returns {import("persistence/graph").IObject}
 *
 * @callback UpdateObject
 * @param {TracingContext} _ctx
 * @param {import("persistence/graph").IObject} body
 * @param {PersistenceMethodOptions} options
 * @returns {Promise<import("persistence/graph").IObject>}
 *
 * @callback DeleteObject
 * @param {TracingContext} _ctx
 * @param {string} object_id
 * @param {PersistenceMethodOptions} options
 * @returns {import("persistence/graph").IObject}
 *
 * @typedef {Object} IPaginationInfo
 * @property {number} count
 * @property {number} next
 * @property {number} previous
 *
 * @typedef {Object} IListingResult
 * @property {any[]} results
 * @property {IPaginationInfo} pagination
 *
 * @callback ListEdges
 * @param {TracingContext} _ctx
 * @param {{src: string, sort_order: 'asc'|'desc', edge_name: string, limit?:number, after?: string, before?: string}} body
 * @param {PersistenceMethodOptions} options
 * @returns {IListingResult}
 *
 *
 * @callback CreateEdge
 * @param {TracingContext} _ctx
 * @param {import("persistence/graph").IEdge} edge
 * @param {PersistenceMethodOptions} options
 * @returns {import("persistence/graph").IEdge}
 *
 * @callback DeleteEdge
 * @param {TracingContext} _ctx
 * @param {import("persistence/graph").IEdge} edge
 * @param {PersistenceMethodOptions} options
 * @returns {import("persistence/graph").IEdge}
 *
 * @callback EdgeExists
 * @param {TracingContext} _ctx
 * @param {import("persistence/graph").IEdge} edge
 * @param {PersistenceMethodOptions} options
 * @returns {Promise<import("persistence/graph").IEdge>}
 *
 * @callback UpdateEdgeSortValue
 * @param {TracingContext} _ctx
 * @param {import("persistence/graph").IEdge} edge
 * @param {PersistenceMethodOptions} options
 * @returns {import("persistence/graph").IEdge}
 *
 * @callback TruncateTable
 * @param {string} table_name
 * @returns {Promise<void>}
 *
 * @callback CloseConnection
 * @returns {Promise<void>}
 *
 */

/** @type {Object.<string, IDatabseDriver >} */
const database_drivers = {
  mongodb,
};

export const system_author = { id: 'system', role: 'system' };

/**
 * @typedef {Object} IPersistenceDriverInternals
 * @property {ICacheDriver} _local_cache
 * @property {IDatabseDriver} _db
 *
 * @typedef {IDatabseDriver & IPersistenceDriverInternals & IPersistenceCacheDriver} IPersistenceDriver
 *
 * Create persistence driver
 * @date 2021-04-06
 * @param {import('config').IConfig} config
 * @param {import('persistence/graph').IGraph} graph
 * @param {import("@/queue").IEventQueueDriver} queue
 * @returns {IPersistenceDriver}
 */
export default function create_client(config, models, queue) {
  logger.info('initializing persistence');

  logger.info('initializing database driver');

  /** @type {IDatabseDriver} */
  const database_driver = database_drivers[config.database];

  if (!database_driver) {
    logger.error('database driver not selected, please check your env file');
    process.exit();
  }

  logger.info('selected database driver', { driver: config.database });

  /** @type {IDatabseDriver} */
  const db = database_driver(config, models);

  logger.info('initializing local cache');
  // const _local_cache = local_cache();

  logger.info('initialized local cache');

  /** @type {Object.<string, ICacheDriver>} */
  const cachers = {
    // local: _local_cache
  };

  logger.info('persistence drivers initialized');

  /** @type {IPersistenceDriver & ICacheDriver} */
  const persistence = {};
  return persistence;
}
