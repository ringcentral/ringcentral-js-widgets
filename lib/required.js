'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = required;

var _wrapDescriptor = require('./wrapDescriptor');

var _wrapDescriptor2 = _interopRequireDefault(_wrapDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @description @required decorator denote a class method must be implemented
 *              by the descendant, or else it will throw error.
 */
function required(prototype, property, descriptor) {
  function throwError() {
    throw new Error(prototype.constructor.name + ' requires ' + this.constructor.name + '.' + property + ' to be implemented.');
  }
  return (0, _wrapDescriptor2.default)(descriptor, throwError);
}

/**
 * @function
 * @description @required.warn decorator denote a class method must be implemented
 *              by the descendant, or else it will warn in console.
 */
required.warn = function warn(prototype, property, descriptor) {
  function warning() {
    console.warn(prototype.constructor.name + ' requires ' + this.constructor.name + '.' + property + ' to be implemented.');
  }
  return (0, _wrapDescriptor2.default)(descriptor, warning);
};
//# sourceMappingURL=required.js.map
