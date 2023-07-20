"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getter;
var WRAPPER = Symbol('wrapper');

/**
 * @deprecated
 */
function getter(prototype, property, _ref) {
  var initializer = _ref.initializer,
    value = _ref.value,
    _get = _ref.get;
  console.warn('"@getter" is deprecated. Use "@computed()" instead.');
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
