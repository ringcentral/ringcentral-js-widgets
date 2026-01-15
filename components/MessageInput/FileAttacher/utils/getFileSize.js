"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileSize = void 0;
require("core-js/modules/es.number.to-fixed.js");
// refer from J: project/common/ui/common/src/helper/helper.ts

var getFileSize = exports.getFileSize = function getFileSize(bytes) {
  if (typeof bytes !== 'number') {
    return '0 B';
  }
  if (bytes < 100) {
    return "".concat(bytes && bytes.toFixed(1), " B");
  }
  if (bytes / 1024 < 1000) {
    return "".concat((bytes / 1024).toFixed(1), " KB");
  }
  if (bytes / 1024 / 1024 < 1000) {
    return "".concat((bytes / 1024 / 1024).toFixed(1), " MB");
  }
  return "".concat((bytes / 1024 / 1024 / 1024).toFixed(1), " GB");
};
//# sourceMappingURL=getFileSize.js.map
