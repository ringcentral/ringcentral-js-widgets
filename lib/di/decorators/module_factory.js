"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ModuleFactory;

var _registry = _interopRequireDefault(require("../registry/registry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
