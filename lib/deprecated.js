"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deprecated;

require("core-js/modules/es6.function.name");

var _wrapDescriptor = _interopRequireDefault(require("./wrapDescriptor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
