"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastAvailableValue = void 0;
/**
 * Returns a function that calls the provided function `fn` and stores its last non-undefined value.
 * When the returned function is called, it will return the new value from `fn` if it is not undefined,
 * otherwise, it will return the last stored value.
 */
var lastAvailableValue = exports.lastAvailableValue = function lastAvailableValue(fn) {
  var value;
  return function () {
    var newValue = fn();
    if (newValue !== undefined) {
      value = newValue;
    }
    return newValue || value;
  };
};
//# sourceMappingURL=lastAvailableValue.js.map
