"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = required;

require("core-js/modules/es6.function.name");

var _wrapDescriptor = _interopRequireDefault(require("./wrapDescriptor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @function
 * @description @required decorator denote a class method must be implemented
 *              by the descendant, or else it will throw error.
 */
function required(prototype, property, descriptor) {
  function throwError() {
    throw new Error("".concat(prototype.constructor.name, " requires ").concat(this.constructor.name, ".").concat(property, " to be implemented."));
  }

  return (0, _wrapDescriptor["default"])(descriptor, throwError);
}
/**
 * @function
 * @description @required.warn decorator denote a class method must be implemented
 *              by the descendant, or else it will warn in console.
 */


required.warn = function warn(prototype, property, descriptor) {
  function warning() {
    console.warn("".concat(prototype.constructor.name, " requires ").concat(this.constructor.name, ".").concat(property, " to be implemented."));
  }

  return (0, _wrapDescriptor["default"])(descriptor, warning);
};
//# sourceMappingURL=required.js.map
