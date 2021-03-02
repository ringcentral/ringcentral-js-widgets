"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callIdentityFunction = callIdentityFunction;

/**
 * Identity function for calls.
 */
function callIdentityFunction(call) {
  return call.sessionId;
}
//# sourceMappingURL=callLoggerHelper.js.map
