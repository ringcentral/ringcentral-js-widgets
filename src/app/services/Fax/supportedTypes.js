"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTED_FAX_EXT_MIME_TYPE_MAP = exports.SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_SET = exports.SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST = exports.SUPPORTED_DOC_EXT_IN_LOWERCASE_LIST = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
// refer from J: project/phone/core/fax/src/constant.ts
var SUPPORTED_DOC_EXT_IN_LOWERCASE_LIST = exports.SUPPORTED_DOC_EXT_IN_LOWERCASE_LIST = ['doc', 'docx'];

// ref:
// https://support.ringcentral.com/article/Fax-Supported-File-Attachments.html?language=en_US
var SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST = exports.SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST = ['pdf', 'psd', 'docm', 'dot', 'mcw', 'xls', 'xlsx', 'xlsb', 'xlsm', 'ppt', 'pptx', 'pptm', 'vsd', 'vdx', 'pub', 'wps', 'wri', 'awd', 'tif', 'tiff', 'gif', 'jpg', 'jpeg', 'bmp', 'png', 'pcx', 'tga', 'rtf', 'txt', 'log', 'h', 'cpp', 'c', 'err', 'hpp', 'wk1', 'wk3', 'wk4', 'wq1', 'xml', 'html', 'htm', 'csv'].concat(SUPPORTED_DOC_EXT_IN_LOWERCASE_LIST);
var TEXT_PLAIN = 'text/plain';
var APPLICATION_PDF = 'application/pdf';
var APPLICATION = 'application/vnd.lotus-1-2-3';
var APPLICATION_MS = 'application/msword';
var APPLICATION_MSX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
var SUPPORTED_FAX_EXT_MIME_TYPE_MAP = exports.SUPPORTED_FAX_EXT_MIME_TYPE_MAP = new Map([['log', TEXT_PLAIN], ['pdf', APPLICATION_PDF], ['h', TEXT_PLAIN], ['cpp', TEXT_PLAIN], ['hpp', TEXT_PLAIN], ['c', TEXT_PLAIN], ['err', TEXT_PLAIN], ['wk1', APPLICATION], ['wk3', APPLICATION], ['wk4', APPLICATION], ['pub', 'application/x-mspublisher'], ['wri', 'application/x-mswrite'], ['psd', 'image/vnd.adobe.photoshop'], ['awd', 'application/octet-stream'], ['pcx', 'image/x-pcx'], ['tga', 'image/x-tga'], ['wps', 'application/vnd.ms-works'], ['vsd', 'application/vnd.visio'], ['wq1', 'application/x-quattro-pro'], ['xml', 'application/xml'], ['csv', 'text/csv'], ['mcw', APPLICATION_MS], ['vdx', 'application/vnd.visio'], ['doc', APPLICATION_MS], ['docx', APPLICATION_MSX]]);
var SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_SET = exports.SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_SET = new Set(SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST);
//# sourceMappingURL=supportedTypes.js.map
