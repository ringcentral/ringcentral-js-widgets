"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXTENSION_TO_CONTENT_TYPE = exports.CONTENT_TYPE_TO_EXTENSION = void 0;
var _invertObj = require("../invertObj");
// project/phone/core/rc_item_common/src/utils/RCItemUtils.ts:153
var CONTENT_TYPE_TO_EXTENSION = {
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
  'video/quicktime': 'mov'
};
exports.CONTENT_TYPE_TO_EXTENSION = CONTENT_TYPE_TO_EXTENSION;
var EXTENSION_TO_CONTENT_TYPE = (0, _invertObj.invertObj)(CONTENT_TYPE_TO_EXTENSION);
exports.EXTENSION_TO_CONTENT_TYPE = EXTENSION_TO_CONTENT_TYPE;
//# sourceMappingURL=constant.js.map
