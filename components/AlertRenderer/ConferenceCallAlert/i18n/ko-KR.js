"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _conferenceCallErrors2 = _interopRequireDefault(require("ringcentral-integration/modules/ConferenceCall/conferenceCallErrors"));

var _conferenceCallErrors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_conferenceCallErrors = {}, _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].bringInFailed, "예기치 않은 오류로 인해 통화를 병합하지 못했습니다. 나중에 다시 시도하세요."), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].makeConferenceFailed, "예기치 않은 오류로 인해 통화를 병합하지 못했습니다. 나중에 다시 시도하세요."), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].terminateConferenceFailed, "예기치 않은 오류로 인해 전화 회의를 끊지 못했습니다. 나중에 다시 시도하세요."), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].removeFromConferenceFailed, "예기치 않은 오류로 인해 참가자를 제거하지 못했습니다. 나중에 다시 시도하세요."), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].callIsRecording, "통화 녹음이 진행 중입니다. 녹음을 중지하고 다시 시도하세요."), _conferenceCallErrors); // @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
