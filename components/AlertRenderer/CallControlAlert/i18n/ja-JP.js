"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("@ringcentral-integration/commons/modules/ActiveCallControl/callControlError"));

var _muteConflictError$un;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError["default"].holdConflictError,
    unHoldConflictError = _callControlError["default"].unHoldConflictError,
    muteConflictError = _callControlError["default"].muteConflictError,
    unMuteConflictError = _callControlError["default"].unMuteConflictError,
    generalError = _callControlError["default"].generalError,
    forwardSuccess = _callControlError["default"].forwardSuccess;

var _default = (_muteConflictError$un = {}, _defineProperty(_muteConflictError$un, muteConflictError, "この通話は他のデバイスでミュートされていました。通話のミュートを解除してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$un, unHoldConflictError, "この通話は他のデバイスで保留に設定されていました。通話の保留を解除してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$un, unMuteConflictError, "この通話は他のデバイスでミュートが解除されていました。通話をミュートしてから、このアプリで操作してください。"), _defineProperty(_muteConflictError$un, holdConflictError, "この通話は他のデバイスで保留解除されています。通話を保留に設定してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$un, generalError, "予期しないサーバエラーが発生しました。後でもう一度お試しください。"), _defineProperty(_muteConflictError$un, forwardSuccess, "転送された通話"), _muteConflictError$un); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
