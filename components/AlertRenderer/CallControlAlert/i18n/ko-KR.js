"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("ringcentral-integration/modules/ActiveCallControl/callControlError"));

var _muteConflictError$ho;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError["default"].holdConflictError,
    unHoldConflictError = _callControlError["default"].unHoldConflictError,
    muteConflictError = _callControlError["default"].muteConflictError,
    unMuteConflictError = _callControlError["default"].unMuteConflictError,
    generalError = _callControlError["default"].generalError,
    forwardSuccess = _callControlError["default"].forwardSuccess;

var _default = (_muteConflictError$ho = {}, _defineProperty(_muteConflictError$ho, muteConflictError, "이 통화는 다른 디바이스에서 음소거되었습니다. 이 앱에서 제어하기 전에 통화 음소거를 해제하세요."), _defineProperty(_muteConflictError$ho, holdConflictError, "이 통화는 다른 디바이스에서 대기되었습니다. 이 앱에서 제어하기 전에 통화 대기를 해제하세요."), _defineProperty(_muteConflictError$ho, unMuteConflictError, "이 통화는 다른 디바이스에서 음소거 해제되었습니다. 이 앱에서 제어하기 전에 통화를 음소거하세요."), _defineProperty(_muteConflictError$ho, unHoldConflictError, "이 통화는 다른 디바이스에서 대기 해제되었습니다. 이 앱에서 제어하기 전에 통화 대기하세요."), _defineProperty(_muteConflictError$ho, generalError, "예기치 않은 서버 오류입니다. 나중에 다시 시도하세요."), _defineProperty(_muteConflictError$ho, forwardSuccess, "착신 전환됨"), _muteConflictError$ho); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
