"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getter;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var WRAPPER = Symbol('wrapper');
/**
 * @function
 * @description Decorator function that convert a class method to a getter
 */

function getter(prototype, property, _ref) {
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
        var targetSymbol = Symbol("".concat(property, "-target"));
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
//# sourceMappingURL=getter.js.map
