"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _webphoneErrors = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/webphoneErrors"));

var _webphoneErrors$conne;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.connectFailed, "ウェブ電話サーバーとの接続が失敗しました。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.connected, "ウェブ電話は登録されています。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.browserNotSupported, "ブラウザーを使用した通話は、Chromeのみでサポートされています。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.webphoneCountOverLimit, "登録できるウェブ電話は最大5台です。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.notOutboundCallWithoutDL, "お使いの内線は、現在、ブラウザーを使用した通話発信を許可されていません。アップグレードについてアカウント担当者にお問い合わせください。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.getSipProvisionError, "メッセージを送信するためのアクセス許可がありません。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.toVoiceMailError, "内部エラーにより、通話をボイスメールに送信できません"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.muteError, "現在、通話をミュートできません。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.holdError, "現在、通話を保留できません。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.flipError, "通話をフリップできません。後でもう一度やり直してください。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.recordError, "現在、通話を録音できません。エラーコード：{errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.recordDisabled, "申し訳ありません。お使いのアカウントでは、通話を録音する機能はサポートされていません。アカウント管理者にお問い合わせください。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.transferError, "通話を転送できません。後でもう一度やり直してください。"), _defineProperty(_webphoneErrors$conne, "webphoneUnavailable", "{error}。サーバーに再接続しています。エラーが解決しない場合は、このエラーを{brandName}サポートに報告してください。"), _defineProperty(_webphoneErrors$conne, "errorCode", "内部エラーコード：{errorCode}"), _defineProperty(_webphoneErrors$conne, "occurs", "内部エラーコード"), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.notOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.getSipProvisionError]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"webphoneUnavailable"@#@ @source: @#@"{error}. We are reconnecting to server. If the error persists, please report this error to {brandName} Support."@#@
// @key: @#@"errorCode"@#@ @source: @#@"Internal error code: {errorCode}"@#@
// @key: @#@"occurs"@#@ @source: @#@"Internal error occurs"@#@


exports.default = _default;
//# sourceMappingURL=ja-JP.js.map
