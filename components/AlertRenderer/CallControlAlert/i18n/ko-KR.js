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
var _muteConflictError$un;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var holdConflictError = _ActiveCallControl.callControlError.holdConflictError,
  unHoldConflictError = _ActiveCallControl.callControlError.unHoldConflictError,
  muteConflictError = _ActiveCallControl.callControlError.muteConflictError,
  unMuteConflictError = _ActiveCallControl.callControlError.unMuteConflictError,
  generalError = _ActiveCallControl.callControlError.generalError,
  forwardSuccess = _ActiveCallControl.callControlError.forwardSuccess,
  transferCompleted = _ActiveCallControl.callControlError.transferCompleted,
  replyCompleted = _ActiveCallControl.callControlError.replyCompleted;
var _default = (_muteConflictError$un = {}, _defineProperty(_muteConflictError$un, muteConflictError, "이 통화는 다른 디바이스에서 음소거되었습니다. 이 앱에서 컨트롤하기 전에 통화 음소거를 해제하세요."), _defineProperty(_muteConflictError$un, unHoldConflictError, "이 통화는 다른 디바이스에서 대기되었습니다. 이 앱에서 컨트롤하기 전에 통화 대기를 해제하세요."), _defineProperty(_muteConflictError$un, unMuteConflictError, "이 통화는 다른 디바이스에서 음소거 해제되었습니다. 이 앱에서 컨트롤하기 전에 통화를 음소거하세요."), _defineProperty(_muteConflictError$un, holdConflictError, "이 통화는 다른 디바이스에서 대기 해제되었습니다. 이 앱에서 컨트롤하기 전에 통화 대기하세요."), _defineProperty(_muteConflictError$un, generalError, "예기치 않은 서버 오류입니다. 나중에 다시 시도하세요."), _defineProperty(_muteConflictError$un, forwardSuccess, "착신 전환됨"), _defineProperty(_muteConflictError$un, transferCompleted, "통화가 전달되었습니다."), _defineProperty(_muteConflictError$un, replyCompleted, "음성 메시지를 보냈습니다."), _muteConflictError$un); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
