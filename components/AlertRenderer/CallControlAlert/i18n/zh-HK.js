"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("ringcentral-integration/modules/ActiveCallControl/callControlError"));

var _muteConflictError$un;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError["default"].holdConflictError,
    unHoldConflictError = _callControlError["default"].unHoldConflictError,
    muteConflictError = _callControlError["default"].muteConflictError,
    unMuteConflictError = _callControlError["default"].unMuteConflictError,
    generalError = _callControlError["default"].generalError,
    forwardSuccess = _callControlError["default"].forwardSuccess;

var _default = (_muteConflictError$un = {}, _defineProperty(_muteConflictError$un, muteConflictError, "此通話已在其他裝置上靜音。處理此應用程式前，請先取消通話的靜音。"), _defineProperty(_muteConflictError$un, unHoldConflictError, "此通話已由其他裝置保留。處理此應用程式前，請先取消保留該通話。"), _defineProperty(_muteConflictError$un, unMuteConflictError, "此通話已在其他裝置上取消靜音。處理此應用程式前，請先將該通話靜音。"), _defineProperty(_muteConflictError$un, holdConflictError, "此通話已由其他裝置取消保留。處理此應用程式前，請先保留該通話。"), _defineProperty(_muteConflictError$un, generalError, "伺服器發生意外錯誤。請稍後再試一次。"), _defineProperty(_muteConflictError$un, forwardSuccess, "已轉接電話"), _muteConflictError$un); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
