"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Debounce = Debounce;

require("core-js/modules/es6.object.define-property");

var _debounce = require("./debounce");

function Debounce(duration) {
  return function innerDecorator(target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        // Attach this function to the instance (not the class)
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: (0, _debounce.debounce)({
            fn: descriptor.value,
            threshold: duration
          })
        });
        return this[key];
      }
    };
  };
}
//# sourceMappingURL=debounce.decorator.js.map
