"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("ringcentral-integration/modules/ActiveCallControl/callControlError"));

var _muteConflictError$ho;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError.default.holdConflictError,
    unHoldConflictError = _callControlError.default.unHoldConflictError,
    muteConflictError = _callControlError.default.muteConflictError,
    unMuteConflictError = _callControlError.default.unMuteConflictError,
    generalError = _callControlError.default.generalError;

var _default = (_muteConflictError$ho = {}, _defineProperty(_muteConflictError$ho, muteConflictError, "この通話は他のデバイスでミュートされていました。通話のミュートを解除してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$ho, holdConflictError, "この通話は他のデバイスで保留に設定されていました。通話の保留を解除してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$ho, unMuteConflictError, "この通話は他のデバイスでミュートが解除されていました。通話をミュートしてから、このアプリで操作してください。"), _defineProperty(_muteConflictError$ho, unHoldConflictError, "この通話は他のデバイスで保留解除されています。通話を保留に設定してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$ho, generalError, "予期しないサーバエラーが発生しました。後でもう一度お試しください。"), _muteConflictError$ho); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@


exports.default = _default;
//# sourceMappingURL=ja-JP.js.map
