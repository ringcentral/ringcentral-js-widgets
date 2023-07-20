"use strict";

require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isPicture;
var picExtensions = ['jpg', 'jpeg', 'gif', 'svg', 'png'];
function isPicture(uri) {
  if (!uri) {
    return false;
  }
  var isPic = false;
  picExtensions.forEach(function (ext) {
    if (uri.indexOf(".".concat(ext, "?")) > 0) {
      isPic = true;
    }
  });
  return isPic;
}
//# sourceMappingURL=isPicture.js.map
