'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WRAPPER = (0, _symbol2.default)('wrapper');

/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */
function selector(prototype, property, _ref) {
  var initializer = _ref.initializer,
      value = _ref.value,
      _get = _ref.get;

  return {
    configurable: true,
    enumerable: true,
    get: function get() {
      var _this = this;

      if (!this[WRAPPER]) {
        this[WRAPPER] = {};
      }
      if (!this[WRAPPER][property]) {
        var targetSymbol = (0, _symbol2.default)(property + '-target');

        this[targetSymbol] = initializer ? initializer.call(this) : value || _get;

        this[WRAPPER][property] = typeof this[targetSymbol] === 'function' ? function () {
          return _this[targetSymbol]();
        } : function () {
          return _this[targetSymbol];
        };
      }
      return this[WRAPPER][property]();
    }
  };
}
exports.default = selector;
//# sourceMappingURL=getter.js.map
