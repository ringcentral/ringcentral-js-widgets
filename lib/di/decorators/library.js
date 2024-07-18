"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Lib;
var _registry = _interopRequireDefault(require("../registry/registry"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// @ts-nocheck

/**
 * @Library() decorator
 * Used for declaring dependencies and metadata when defines a library
 * This is only a facade of Module metadata, they behave exactly the same.
 */
function Lib(metadata) {
  /* eslint-disable */
  return function (constructor) {
    _registry["default"].registerModule(constructor, metadata);
    return constructor;
  };
}
//# sourceMappingURL=library.js.map
