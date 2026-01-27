"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAX_COVER_NONE_VALUE = exports.FAX_CONTENT_LIMIT = exports.FAX_ATTACHMENTS_ACCEPT = void 0;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _FaxCover = require("./FaxCover");
var _supportedTypes = require("./supportedTypes");
var FAX_CONTENT_LIMIT = exports.FAX_CONTENT_LIMIT = {
  MAX_ATTACHMENT_STORAGE_SIZE: 50 * 1024 * 1024,
  // 50 MB
  MAX_ATTACHMENT_STORAGE_SIZE_IN_MB: 50
};
var FAX_ATTACHMENTS_ACCEPT = exports.FAX_ATTACHMENTS_ACCEPT = _supportedTypes.SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST.map(function (ext) {
  return ".".concat(ext);
}).join(',');
var FAX_COVER_NONE_VALUE = exports.FAX_COVER_NONE_VALUE = _FaxCover.COVER_US_LIST[0].id;
//# sourceMappingURL=constant.js.map
