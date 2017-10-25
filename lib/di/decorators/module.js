'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Module;

var _registry = require('../registry/registry');

var _registry2 = _interopRequireDefault(_registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Module() decorator
 * Used for declaring dependencies and metadata when defines a module
 */
function Module(metadata) {
  /* eslint-disable */
  return function (constructor) {
    _registry2.default.registerModule(constructor, metadata);
    return constructor;
  };
}
//# sourceMappingURL=module.js.map
