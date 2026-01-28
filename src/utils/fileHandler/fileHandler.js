"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileExtensionFromContentType = exports.getFileExtension = exports.getFileContentTypeFromExtension = void 0;
exports.getFilename = getFilename;
exports.getFilenameWithNoUrlParams = getFilenameWithNoUrlParams;
exports.removeExtension = void 0;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.last-index-of.js");
require("core-js/modules/es.array.slice.js");
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
var removeExtension = exports.removeExtension = function removeExtension(str) {
  return str.split('.').slice(0, -1).join('.');
};

/**
 * get file extension.
 */
var getFileExtension = exports.getFileExtension = function getFileExtension(fileName) {
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
var getFileExtensionFromContentType = exports.getFileExtensionFromContentType = function getFileExtensionFromContentType(contentType) {
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
var getFileContentTypeFromExtension = exports.getFileContentTypeFromExtension = function getFileContentTypeFromExtension(extensionName) {
  return extensionName ? _constant.EXTENSION_TO_CONTENT_TYPE[extensionName.toLowerCase()] : undefined;
};

/**
 * get file name with extension, and no url params.
 */
function getFilenameWithNoUrlParams(fullPath) {
  return fullPath.substring(fullPath.lastIndexOf('/') + 1).split('?')[0];
}
//# sourceMappingURL=fileHandler.js.map
