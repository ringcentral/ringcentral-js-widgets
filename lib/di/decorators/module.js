"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Module;
var _registry = _interopRequireDefault(require("../registry/registry"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// @ts-nocheck

/**
 * @Module() decorator
 * Used for declaring dependencies and metadata when defines a module
 */
function Module(metadata) {
  /* eslint-disable */
  return function (constructor) {
    _registry["default"].registerModule(constructor, metadata);
    return constructor;
  };
}
//# sourceMappingURL=module.js.map
