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

export interface ModuleActionTypes {
  init: string;
  initSuccess: string;
  reset: string;
  resetSuccess: string;
}
