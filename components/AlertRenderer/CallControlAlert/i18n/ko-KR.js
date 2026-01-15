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
var _default = (_callsMerged$somethin = {}, _defineProperty(_callsMerged$somethin, callsMerged, '통화 병합됨'), _defineProperty(_callsMerged$somethin, somethingWentWrong, '문제가 발생했습니다. 다시 시도하세요.'), _defineProperty(_callsMerged$somethin, tooManyParticipants, '최대 참가자 수에 도달했습니다.'), _defineProperty(_callsMerged$somethin, muteConflictError, '이 통화는 다른 디바이스에서 음소거되었습니다. 이 앱에서 컨트롤하기 전에 통화 음소거를 해제하세요.'), _defineProperty(_callsMerged$somethin, unHoldConflictError, '이 통화는 다른 디바이스에서 대기되었습니다. 이 앱에서 컨트롤하기 전에 통화 대기를 해제하세요.'), _defineProperty(_callsMerged$somethin, unMuteConflictError, '이 통화는 다른 디바이스에서 음소거 해제되었습니다. 이 앱에서 컨트롤하기 전에 통화를 음소거하세요.'), _defineProperty(_callsMerged$somethin, holdConflictError, '이 통화는 다른 디바이스에서 대기 해제되었습니다. 이 앱에서 컨트롤하기 전에 통화 대기하세요.'), _defineProperty(_callsMerged$somethin, generalError, '예기치 않은 서버 오류입니다. 나중에 다시 시도하세요.'), _defineProperty(_callsMerged$somethin, forwardSuccess, '착신 전환됨'), _defineProperty(_callsMerged$somethin, transferCompleted, '통화가 전달되었습니다.'), _defineProperty(_callsMerged$somethin, replyCompleted, '음성 메시지를 보냈습니다.'), _callsMerged$somethin); // @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
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
//# sourceMappingURL=ko-KR.js.map
