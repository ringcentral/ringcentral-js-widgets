'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEssential = isEssential;
exports.simplifyExtensionData = simplifyExtensionData;
/**
 * @function
 * @description Determines whether an extension data is worth caching
 * @param {Object} ext - extension data
 * @return {Boolean}
 */
function isEssential(ext) {
  return ext.extensionNumber && ext.extensionNumber !== '' && ext.status === 'Enabled' && ['DigitalUser', 'User', 'Department'].indexOf(ext.type) >= 0;
}
/**
 * @function
 * @description Returns a simplified extension data for caching to reducer storage use
 * @param {Object} ext - extension data
 * @return {Object}
 */
function simplifyExtensionData(ext) {
  return {
    ext: ext.extensionNumber,
    name: ext.name,
    id: ext.id,
    status: ext.status,
    type: ext.type,
    contact: ext.contact,
    hasProfileImage: ext.profileImage && ext.profileImage.etag
  };
}
//# sourceMappingURL=accountExtensionHelper.js.map
