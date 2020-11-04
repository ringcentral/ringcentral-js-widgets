"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxyState = void 0;

require("core-js/modules/es6.object.define-property");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * proxy state for client's async state changes
 *
 * @param callback it should be a async function, and run in a reducer.
 */
var proxyState = function proxyState(callback) {
  return function (target, key, descriptor) {
    if (target.__proxyState__) {
      target.__proxyState__[key] = callback;
    } else {
      target.__proxyState__ = _defineProperty({}, key, callback);
    }

    return descriptor;
  };
};

exports.proxyState = proxyState;
//# sourceMappingURL=proxyState.js.map
