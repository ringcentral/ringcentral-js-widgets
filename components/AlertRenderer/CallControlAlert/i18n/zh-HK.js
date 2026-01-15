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
var _ActiveCallControl = require("@ringcentral-integration/commons/modules/ActiveCallControl");
var _callsMerged$somethin;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var callsMerged = _ActiveCallControl.callControlAlerts.callsMerged,
  somethingWentWrong = _ActiveCallControl.callControlAlerts.somethingWentWrong,
  tooManyParticipants = _ActiveCallControl.callControlAlerts.tooManyParticipants;
var holdConflictError = _ActiveCallControl.callControlError.holdConflictError,
  unHoldConflictError = _ActiveCallControl.callControlError.unHoldConflictError,
  muteConflictError = _ActiveCallControl.callControlError.muteConflictError,
  unMuteConflictError = _ActiveCallControl.callControlError.unMuteConflictError,
  generalError = _ActiveCallControl.callControlError.generalError,
  forwardSuccess = _ActiveCallControl.callControlError.forwardSuccess,
  transferCompleted = _ActiveCallControl.callControlError.transferCompleted,
  replyCompleted = _ActiveCallControl.callControlError.replyCompleted;
var _default = (_callsMerged$somethin = {}, _defineProperty(_callsMerged$somethin, callsMerged, '通話已合併'), _defineProperty(_callsMerged$somethin, somethingWentWrong, '發生錯誤。請再試一次。'), _defineProperty(_callsMerged$somethin, tooManyParticipants, '已達到參與者人數上限。'), _defineProperty(_callsMerged$somethin, muteConflictError, '此通話已在另一台裝置上靜音。處理此應用程式前，請先取消通話的靜音。'), _defineProperty(_callsMerged$somethin, unHoldConflictError, '此通話已由其他裝置保留。處理此應用程式前，請先取消保留該通話。'), _defineProperty(_callsMerged$somethin, unMuteConflictError, '此通話已在其他裝置上取消靜音。處理此應用程式前，請先將該通話靜音。'), _defineProperty(_callsMerged$somethin, holdConflictError, '此通話已由其他裝置取消保留。處理此應用程式前，請先保留該通話。'), _defineProperty(_callsMerged$somethin, generalError, '伺服器發生意外錯誤。請稍後再試。'), _defineProperty(_callsMerged$somethin, forwardSuccess, '已轉接通話'), _defineProperty(_callsMerged$somethin, transferCompleted, '通話已轉接'), _defineProperty(_callsMerged$somethin, replyCompleted, '語音訊息已傳送。'), _callsMerged$somethin); // @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
