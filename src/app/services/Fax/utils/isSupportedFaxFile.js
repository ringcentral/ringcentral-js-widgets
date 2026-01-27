"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedFaxFile = void 0;
require("core-js/modules/es.function.name.js");
var _utils = require("@ringcentral-integration/utils");
var _supportedTypes = require("../supportedTypes");
// ref from J: project/phone/core/fax/src/controller/FaxAttachmentController.ts
var isSupportedFaxFile = exports.isSupportedFaxFile = function isSupportedFaxFile(file) {
  var extName = (0, _utils.getFileExtension)(file.name);
  return extName && _supportedTypes.SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_SET.has(extName.toLowerCase()) && file.name.length <= 256;
};
//# sourceMappingURL=isSupportedFaxFile.js.map
