"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deprecated;
var _wrapDescriptor = _interopRequireDefault(require("./wrapDescriptor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// @ts-nocheck

function deprecated(prototype, property, descriptor) {
  var warned = false;
  function warning() {
    if (!warned) {
      warned = true;
      console.warn("".concat(prototype.constructor.name, ".").concat(property, " is deprecated. Please stop use it soon before the feature is completely removed"));
    }
  }
  return (0, _wrapDescriptor["default"])(descriptor, warning);
}
//# sourceMappingURL=deprecated.js.map
