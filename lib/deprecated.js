'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deprecated;

var _wrapDescriptor = require('./wrapDescriptor');

var _wrapDescriptor2 = _interopRequireDefault(_wrapDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deprecated(prototype, property, descriptor) {
  var warned = false;
  function warning() {
    if (!warned) {
      warned = true;
      console.warn(prototype.constructor.name + '.' + property + ' is deprecated. Please stop use it soon before the feature is completely removed');
    }
  }
  return (0, _wrapDescriptor2.default)(descriptor, warning);
}
//# sourceMappingURL=deprecated.js.map
