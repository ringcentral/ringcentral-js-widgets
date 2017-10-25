'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

exports.DIError = DIError;
exports.CircularDependencyError = CircularDependencyError;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DIError(message) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Error, [null].concat(['[DI] ' + message], args)))();
}

function CircularDependencyError(pending, dep) {
  var path = (0, _from2.default)(pending.values()).join(' -> ');
  return DIError('Circular dependency detected: ' + path + ' -> ' + dep);
}
//# sourceMappingURL=error.js.map
