"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileNameWithoutExt = void 0;
require("core-js/modules/es.array.last-index-of.js");
var getFileNameWithoutExt = exports.getFileNameWithoutExt = function getFileNameWithoutExt(fileName) {
  var lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return fileName;
  return fileName.substring(0, lastDotIndex);
};
//# sourceMappingURL=helper.js.map
