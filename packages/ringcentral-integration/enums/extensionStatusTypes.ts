import { createHashMap } from '../lib/HashMap';

/**
 * @typedef ExtensionStatusTypes
 * @type {object}
 * @property {string} enabled
 * @property {string} notActivated
 * @property {string} disabled
 */

/**
 * @type {ExtensionStatusTypes}
 */
export const extensionStatusTypes = createHashMap({
  enabled: 'Enabled',
  notActivated: 'NotActivated',
  disabled: 'Disabled',
});
