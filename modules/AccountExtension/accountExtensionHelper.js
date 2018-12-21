'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasExtensionNumber = hasExtensionNumber;
exports.isEnabled = isEnabled;
exports.isNotActivated = isNotActivated;
exports.isFiltered = isFiltered;
exports.simplifyExtensionData = simplifyExtensionData;
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
function hasExtensionNumber(ext) {
  return ext.extensionNumber && ext.extensionNumber !== '';
}

/**
 *
 * @param {Extension} ext
 * @returns {boolean}
 */
function isEnabled(ext) {
  return ext.status === 'Enabled';
}

/**
 *
 * @param {Extension} ext
 * @returns {boolean}
 */
function isNotActivated(ext) {
  return ext.status === 'NotActivated';
}

/**
 *
 * @param {object} ext
 * @param {string[]} list
 * @returns {boolean}
 */
function isFiltered(ext, list) {
  return list.indexOf(ext.type) === -1;
}

/**
 * @function
 * @description Returns a simplified extension data for caching to reducer storage use
 * @param {Extension}
 * @return {SimpleExtension}
 */
function simplifyExtensionData(_ref) {
  var extensionNumber = _ref.extensionNumber,
      name = _ref.name,
      id = _ref.id,
      status = _ref.status,
      type = _ref.type,
      contact = _ref.contact,
      profileImage = _ref.profileImage;

  return {
    ext: extensionNumber,
    name: name,
    id: id,
    status: status,
    type: type,
    contact: contact,
    hasProfileImage: !!(profileImage && profileImage.etag)
  };
}
//# sourceMappingURL=accountExtensionHelper.js.map
