"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _conferenceCallErrors;

var _conferenceCallErrors2 = require("ringcentral-integration/modules/ConferenceCall/conferenceCallErrors");

var _conferenceCallErrors3 = _interopRequireDefault(_conferenceCallErrors2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_conferenceCallErrors = {}, (0, _defineProperty3.default)(_conferenceCallErrors, _conferenceCallErrors3.default.bringInFailed, "由于意外错误，合并通话失败。请稍后重试。"), (0, _defineProperty3.default)(_conferenceCallErrors, _conferenceCallErrors3.default.makeConferenceFailed, "由于意外错误，合并通话失败。请稍后重试。"), (0, _defineProperty3.default)(_conferenceCallErrors, _conferenceCallErrors3.default.terminateConferenceFailed, "由于意外错误，挂断会议失败。请稍后重试。"), (0, _defineProperty3.default)(_conferenceCallErrors, _conferenceCallErrors3.default.removeFromConferenceFailed, "由于意外错误，移除参与者失败。请稍后重试。"), _conferenceCallErrors);

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
//# sourceMappingURL=zh-CN.js.map
