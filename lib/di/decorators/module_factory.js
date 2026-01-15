"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ModuleFactory;
var _registry = _interopRequireDefault(require("../registry/registry"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// @ts-nocheck

/**
 * @ModuleFactory() decorator
 * Used for defining a root module of the system
 * and also declare and import dependencies injected into the system.
 */
function ModuleFactory(metadata) {
  /* eslint-disable */
  return function (constructor) {
    _registry["default"].registerModuleFactory(constructor, metadata);
    return constructor;
  };
}
//# sourceMappingURL=module_factory.js.map
