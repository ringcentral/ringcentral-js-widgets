import Enum from '../lib/Enum';

/**
 * @typedef {Object} ModuleActionTypes
 * @property {String} init
 * @property {String} initSuccess
 * @property {String} reset
 * @property {String} resetSuccess
 */

/**
 * @type {ModuleActionTypes}
 */
export const moduleActionTypes = new Enum([
  'init',
  'initSuccess',
  'reset',
  'resetSuccess',
]);
