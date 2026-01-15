"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callIdentityFunction = callIdentityFunction;
exports.getRecordingInfo = getRecordingInfo;
exports.hasRecording = hasRecording;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-string.js");
/**
 * Identity function for calls.
 */
function callIdentityFunction(call) {
  return call.sessionId;
}
function hasRecording(call) {
  return !!(call.recording && call.recording.id);
}

// W6t1Xt8UVDFNQA&recordingId=1455472006&from=+18085820904&to=+18707762775&date=2021-10-09T14:35:32.748Z
function getRecordingInfo(call) {
  return hasRecording(call) ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  "".concat(call.id, "&recordingId=").concat(call.recording.id, "&from=").concat(encodeURIComponent(
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  call.from.phoneNumber
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  ), "&to=").concat(encodeURIComponent(call.to.phoneNumber), "&date=").concat(new Date(
  // @ts-expect-error TS(2769): No overload matches this call.
  call.startTime).toISOString()) : '';
}
//# sourceMappingURL=callLoggerHelper.js.map
