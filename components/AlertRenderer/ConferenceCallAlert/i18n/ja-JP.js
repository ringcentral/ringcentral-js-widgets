"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ConferenceCall = require("@ringcentral-integration/commons/modules/ConferenceCall");
var _conferenceCallErrors;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_conferenceCallErrors = {}, _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.bringInFailed, "予期しないエラーにより、通話をマージできませんでした。後でもう一度やり直してください。"), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.makeConferenceFailed, "予期しないエラーにより、通話をマージできませんでした。後でもう一度やり直してください。"), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.terminateConferenceFailed, "予期しないエラーにより、会議を終了できませんでした。後でもう一度やり直してください。"), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.removeFromConferenceFailed, "予期しないエラーにより、参加者を削除できませんでした。後でもう一度やり直してください。"), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.callIsRecording, "通話を録音中です。録音を停止し、もう一度やり直してください。"), _conferenceCallErrors); // @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
