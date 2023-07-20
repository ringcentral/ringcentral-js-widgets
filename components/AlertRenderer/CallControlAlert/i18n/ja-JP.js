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
var _default = (_muteConflictError$un = {}, _defineProperty(_muteConflictError$un, muteConflictError, "この通話は他のデバイスでミュートされていました。通話のミュートを解除してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$un, unHoldConflictError, "この通話は他のデバイスで保留に設定されていました。通話の保留を解除してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$un, unMuteConflictError, "この通話は他のデバイスでミュートが解除されていました。通話をミュートしてから、このアプリで操作してください。"), _defineProperty(_muteConflictError$un, holdConflictError, "この通話は他のデバイスで保留解除されています。通話を保留に設定してから、このアプリで操作してください。"), _defineProperty(_muteConflictError$un, generalError, "予期しないサーバエラーが発生しました。後でもう一度やり直してください。"), _defineProperty(_muteConflictError$un, forwardSuccess, "通話が転送されました"), _defineProperty(_muteConflictError$un, transferCompleted, "通話が転送されました"), _defineProperty(_muteConflictError$un, replyCompleted, "ボイスメッセージを送信しました。"), _muteConflictError$un); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
