"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasExtensionNumber = hasExtensionNumber;
exports.isEnabled = isEnabled;
exports.isNotActivated = isNotActivated;
exports.isFiltered = isFiltered;

require("core-js/modules/es6.array.index-of");

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
//# sourceMappingURL=accountDirectoryHelper.js.map
