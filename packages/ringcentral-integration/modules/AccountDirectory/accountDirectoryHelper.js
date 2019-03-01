/**
 * @typedef Extension
 * @type {object}
 * @property {string} extensionNumber
 * @property {string} status
 * @property {string} name
 * @property {string} id
 * @property {string} type
 * @property {object} contact
 * @property {object} profileImage
 */

/**
 * @typedef SimpleExtension
 * @type {object}
 * @property {string} ext
 * @property {string} status
 * @property {string} name
 * @property {string} id
 * @property {string} type
 * @property {object} contact
 * @property {bool} hasProfileImage
 */

/**
 *
 * @param {Extension} ext
 * @returns {boolean}
 */
export function hasExtensionNumber(ext) {
  return (
    ext.extensionNumber &&
    ext.extensionNumber !== ''
  );
}

/**
 *
 * @param {Extension} ext
 * @returns {boolean}
 */
export function isEnabled(ext) {
  return ext.status === 'Enabled';
}

/**
 *
 * @param {Extension} ext
 * @returns {boolean}
 */
export function isNotActivated(ext) {
  return ext.status === 'NotActivated';
}

/**
 *
 * @param {object} ext
 * @param {string[]} list
 * @returns {boolean}
 */
export function isFiltered(ext, list) {
  return list.indexOf(ext.type) === -1;
}

