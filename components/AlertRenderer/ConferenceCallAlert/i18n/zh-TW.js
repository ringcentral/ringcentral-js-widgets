"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _conferenceCallErrors2 = _interopRequireDefault(require("@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors"));

var _conferenceCallErrors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_conferenceCallErrors = {}, _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].bringInFailed, "因為意外發生錯誤，合併通話失敗。請稍後再試一次。"), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].makeConferenceFailed, "因為意外發生錯誤，合併通話失敗。請稍後再試一次。"), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].terminateConferenceFailed, "因為意外發生錯誤，掛斷電話會議失敗。請稍後再試一次。"), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].removeFromConferenceFailed, "因為意外發生錯誤，移除參與者失敗。請稍後再試一次。"), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].callIsRecording, "通話錄音進行中。請停止錄音並稍後再試一次。"), _conferenceCallErrors); // @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-TW.js.map
