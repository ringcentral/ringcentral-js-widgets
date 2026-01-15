"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getter;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
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
    // @ts-expect-error TS(7023): 'get' implicitly has return type 'any' because it ... Remove this comment to see the full error message
    get: function get() {
      var _this = this;
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this[WRAPPER]) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[WRAPPER] = {};
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this[WRAPPER][property]) {
        var targetSymbol = Symbol("".concat(property, "-target"));

        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[targetSymbol] = initializer ? initializer.call(this) : value || _get;

        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[WRAPPER][property] =
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        typeof this[targetSymbol] === 'function' ?
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        function () {
          return _this[targetSymbol]();
        } :
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        function () {
          return _this[targetSymbol];
        };
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return this[WRAPPER][property]();
    }
  };
}
//# sourceMappingURL=getter.js.map
