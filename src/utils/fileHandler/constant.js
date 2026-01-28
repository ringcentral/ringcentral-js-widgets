"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXTENSION_TO_CONTENT_TYPE = exports.CONTENT_TYPE_TO_EXTENSION = void 0;
var _invertObj = require("../invertObj");
// project/phone/core/rc_item_common/src/utils/RCItemUtils.ts:153
var CONTENT_TYPE_TO_EXTENSION = exports.CONTENT_TYPE_TO_EXTENSION = {
  'text/vcard': 'vcf',
  'image/tiff': 'tif',
  'image/jpeg': 'jpg',
  'x-ms-wmv': 'wmv',
  'x-flv': 'flv',
  'audio/mpeg': 'mp3',
  'video/mpeg': 'mpeg',
  'video/mp4': 'mp4',
  'text/plain': 'txt',
  'text/html': 'html',
  'image/svg+xml': 'svg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
  'application/gzip': 'gz',
  'audio/mp4': 'm4a',
  'audio/amr': 'amr',
  'application/rtf': 'rtf',
  'application/zip': 'zip',
  'video/x-msvideo': 'avi',
  'video/msvideo': 'msvideo',
  'video/x-flv': 'flv',
  'video/quicktime': 'mov',
  'application/pdf': 'pdf',
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
  'image/webp': 'webp',
  'video/3gpp': '3gp',
  'video/webm': 'webm',
  'video/x-ms-wmv': 'wmv',
  'video/ogg': 'ogg',
  'audio/ogg': 'oga',
  'application/ogg': 'ogg',
  'text/csv': 'csv',
  'text/calendar': 'ics'
};
var EXTENSION_TO_CONTENT_TYPE = exports.EXTENSION_TO_CONTENT_TYPE = (0, _invertObj.invertObj)(CONTENT_TYPE_TO_EXTENSION);
//# sourceMappingURL=constant.js.map
