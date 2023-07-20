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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_conferenceCallErrors = {}, _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.bringInFailed, "因為意外發生錯誤，合併通話失敗。請稍後再試。"), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.makeConferenceFailed, "因為意外發生錯誤，合併通話失敗。請稍後再試。"), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.terminateConferenceFailed, "因為意外發生錯誤，掛斷電話會議失敗。請稍後再試。"), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.removeFromConferenceFailed, "因為意外發生錯誤，移除參與者失敗。請稍後再試。"), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.callIsRecording, "通話錄音進行中。請停止錄音並稍後再試一次。"), _conferenceCallErrors); // @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
