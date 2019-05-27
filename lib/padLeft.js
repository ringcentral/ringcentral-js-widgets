"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = padLeft;

function padLeft(input, _char, length) {
  var str = "".concat(input);
  var padding = [];

  for (var i = str.length; i < length; i += 1) {
    padding.push(_char);
  }

  return "".concat(padding.join('')).concat(str);
}
//# sourceMappingURL=padLeft.js.map
