'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

exports.selector = selector;

var _reselect = require('reselect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WRAPPER = (0, _symbol2.default)('wrapper');

/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */
function selector(prototype, property, _ref) {
  var initializer = _ref.initializer;

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

        this[targetSymbol] = _reselect.createSelector.apply(undefined, (0, _toConsumableArray3.default)(initializer.call(this)));

        this[WRAPPER][property] = function () {
          return _this[targetSymbol]();
        };
      }
      return this[WRAPPER][property]();
    }
  };
}
//# sourceMappingURL=index.js.map
