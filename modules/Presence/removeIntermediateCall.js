"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeIntermediateCall = void 0;
var _ramda = require("ramda");
var _callLogHelpers = require("../../lib/callLogHelpers");
var removeIntermediateCall = (0, _ramda.reduce)(function (result, activeCall) {
  if (
  // @ts-expect-error TS(2345): Argument of type 'ActiveCallInfo[] | undefined' is... Remove this comment to see the full error message
  !(0, _callLogHelpers.isIntermediateCall)(activeCall) && !(0, _ramda.find)(function (item) {
    return (
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      item.sessionId === activeCall.sessionId &&
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      item.direction === activeCall.direction
    );
  },
  // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
  result)) {
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    result.push(activeCall);
  }
  return result;
});
exports.removeIntermediateCall = removeIntermediateCall;
//# sourceMappingURL=removeIntermediateCall.js.map
