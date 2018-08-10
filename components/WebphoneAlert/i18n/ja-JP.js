"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _webphoneErrors$conne;

var _webphoneErrors = require("ringcentral-integration/modules/Webphone/webphoneErrors");

var _webphoneErrors2 = _interopRequireDefault(_webphoneErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_webphoneErrors$conne = {}, (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.connectFailed, "ウェブ電話サーバーとの接続が失敗しました。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.connected, "ウェブ電話は登録されています。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.browserNotSupported, "ブラウザーを使用した通話は、Chromeのみでサポートされています。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.webphoneCountOverLimit, "登録できるウェブ電話は最大5台です。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.notOutboundCallWithoutDL, "お使いの内線は、現在、ブラウザーを使用した通話発信を許可されていません。アップグレードについてアカウント担当者にお問い合わせください。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.getSipProvisionError, "メッセージを送信するためのアクセス許可がありません。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.toVoiceMailError, "内部エラーにより、通話をボイスメールに送信できません"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.muteError, "現在、通話をミュートできません。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.holdError, "現在、通話を保留できません。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.flipError, "通話をフリップできません。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.recordError, "現在、通話を録音できません。エラーコード：{errorCode}"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.recordDisabled, "申し訳ありません。お使いのアカウントでは、通話を録音する機能はサポートされていません。アカウント管理者にお問い合わせください。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.transferError, "通話を転送できません。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_webphoneErrors$conne, "webphoneUnavailable", "{error}。サーバーに再接続しています。エラーが解決しない場合は、このエラーを{brandName}サポートに報告してください。"), (0, _defineProperty3.default)(_webphoneErrors$conne, "errorCode", "内部エラーコード：{errorCode}"), (0, _defineProperty3.default)(_webphoneErrors$conne, "occurs", "内部エラーコード"), _webphoneErrors$conne);

// @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
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
//# sourceMappingURL=ja-JP.js.map
