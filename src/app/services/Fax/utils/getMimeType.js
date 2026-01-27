"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMimeTypeByFile = exports.getMimeType = void 0;
require("core-js/modules/es.function.name.js");
var _utils = require("@ringcentral-integration/utils");
var _supportedTypes = require("../supportedTypes");
var getMimeType = exports.getMimeType = function getMimeType(fileExt) {
  return _supportedTypes.SUPPORTED_FAX_EXT_MIME_TYPE_MAP.get(fileExt);
};
var getMimeTypeByFile = exports.getMimeTypeByFile = function getMimeTypeByFile(file) {
  var fileExt = (0, _utils.getFileExtension)(file.name);
  return getMimeType(fileExt) || file.type || fileExt;
};
//# sourceMappingURL=getMimeType.js.map
