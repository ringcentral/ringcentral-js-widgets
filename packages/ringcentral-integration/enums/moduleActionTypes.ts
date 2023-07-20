import type { ObjectMapKey } from '@ringcentral-integration/core/lib/ObjectMap';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

/**
 * @typedef {Object} ModuleActionTypes
 * @property {String} init
 * @property {String} initSuccess
 * @property {String} reset
 * @property {String} resetSuccess
 */
export const moduleActionTypes = ObjectMap.fromKeys([
  'init',
  'initSuccess',
  'reset',
  'resetSuccess',
]);

export type ModuleActionTypes = Record<
  ObjectMapKey<typeof moduleActionTypes>,
  string
>;
