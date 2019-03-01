"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPicture;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

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
