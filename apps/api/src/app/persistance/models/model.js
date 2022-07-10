/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  SchemaDefinitionType,
  SchemaDefinition,
  SchemaOptions,
} from 'mongoose';

/**
 * @type {} s
 *
 * @template [T]
 * @typedef IModel
 * @property {T} model_ref just reference with no implementation
 * @property {SchemaOptions} config
 * @property {{[x in keyof T]: {type: string, index: boolean}}} fields
 * @property {Object.<string, {type: string}>} relations
 * @property {[keyof T]} sortable_fields
 * @property {{ filters: [keyof T] }} search
 */

//  * @property {Object.<string, {type: keyof typeof import('@/persistance/models')}>} relations
