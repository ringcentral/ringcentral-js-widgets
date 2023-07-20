"use strict";

require("core-js/modules/es.array.join");
require("core-js/modules/es.array.last-index-of");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileExtensionFromContentType = exports.getFileExtension = exports.getFileContentTypeFromExtension = void 0;
exports.getFilename = getFilename;
exports.removeExtension = void 0;
var _constant = require("./constant");
/**
 * get file name with extension.
 */
function getFilename(fullPath) {
  return fullPath.substring(fullPath.lastIndexOf('/') + 1);
}

/**
 * remove file path extension.
 */
var removeExtension = function removeExtension(str) {
  return str.split('.').slice(0, -1).join('.');
};

/**
 * get file extension.
 */
exports.removeExtension = removeExtension;
var getFileExtension = function getFileExtension(fileName) {
  var splitArrays = fileName.toLowerCase().split('.');
  return splitArrays.length > 1 ? splitArrays.pop() : '';
};

/**
 * get file extension from content type
 *
 * @example
 * ```ts
 * console.log(getFileExtensionFromContentType('image/gif')) // gif
 * ```
 */
exports.getFileExtension = getFileExtension;
var getFileExtensionFromContentType = function getFileExtensionFromContentType(contentType) {
  var _CONTENT_TYPE_TO_EXTE;
  return contentType ? (_CONTENT_TYPE_TO_EXTE = _constant.CONTENT_TYPE_TO_EXTENSION[contentType.toLowerCase()]) !== null && _CONTENT_TYPE_TO_EXTE !== void 0 ? _CONTENT_TYPE_TO_EXTE : contentType.split('/')[1] : undefined;
};

/**
 * get content type from file extension
 *
 * @example
 * ```ts
 * console.log(getFileContentTypeFromExtension('gif')) // image/gif
 * ```
 */
exports.getFileExtensionFromContentType = getFileExtensionFromContentType;
var getFileContentTypeFromExtension = function getFileContentTypeFromExtension(extensionName) {
  return extensionName ? _constant.EXTENSION_TO_CONTENT_TYPE[extensionName.toLowerCase()] : undefined;
};
exports.getFileContentTypeFromExtension = getFileContentTypeFromExtension;
//# sourceMappingURL=fileHandler.js.map
