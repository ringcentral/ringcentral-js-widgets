"use strict";

require("core-js/modules/es.array.last-index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileNameWithoutExt = void 0;
var getFileNameWithoutExt = function getFileNameWithoutExt(fileName) {
  var lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return fileName;
  return fileName.substring(0, lastDotIndex);
};
exports.getFileNameWithoutExt = getFileNameWithoutExt;
//# sourceMappingURL=helper.js.map
