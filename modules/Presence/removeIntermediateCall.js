"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeIntermediateCall = void 0;
var _ramda = require("ramda");
var _callLogHelpers = require("../../lib/callLogHelpers");
var removeIntermediateCall = (0, _ramda.reduce)(function (result, activeCall) {
  if (
  // @ts-expect-error
  !(0, _callLogHelpers.isIntermediateCall)(activeCall) && !(0, _ramda.find)(function (item) {
    return (
      // @ts-expect-error
      item.sessionId === activeCall.sessionId &&
      // @ts-expect-error
      item.direction === activeCall.direction
    );
  },
  // @ts-expect-error
  result)) {
    // @ts-expect-error
    result.push(activeCall);
  }
  return result;
});
exports.removeIntermediateCall = removeIntermediateCall;
//# sourceMappingURL=removeIntermediateCall.js.map
