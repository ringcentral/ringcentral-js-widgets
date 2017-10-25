'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Lib;

var _registry = require('../registry/registry');

var _registry2 = _interopRequireDefault(_registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Library() decorator
 * Used for declaring dependencies and metadata when defines a library
 * This is only a facade of Module metadata, they behave exactly the same.
 */
function Lib(metadata) {
  /* eslint-disable */
  return function (constructor) {
    _registry2.default.registerModule(constructor, metadata);
    return constructor;
  };
}
//# sourceMappingURL=library.js.map
