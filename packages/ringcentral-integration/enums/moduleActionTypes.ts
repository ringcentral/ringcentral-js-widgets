import { createEnum } from '../lib/Enum';

/**
 * @typedef {Object} ModuleActionTypes
 * @property {String} init
 * @property {String} initSuccess
 * @property {String} reset
 * @property {String} resetSuccess
 */
export const moduleActionTypes = createEnum([
  'init',
  'initSuccess',
  'reset',
  'resetSuccess',
]);

export type ModuleActionTypes = Record<keyof typeof moduleActionTypes, string>;
