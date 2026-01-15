"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));
var _webphoneMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneMessages"));
var _webphoneErrors$conne;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_webphoneErrors$conne = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, '申し訳ございません。現在、電話機能は使用できません。後でやり直してください。 '), _webphoneErrors["default"].connected, 'ウェブ電話は登録されています。'), _webphoneErrors["default"].browserNotSupported, '申し訳ございません。このブラウザーを使用して通話することはできません。'), _webphoneErrors["default"].webphoneCountOverLimit, '登録できるウェブ電話は最大5台です。'), _webphoneErrors["default"].checkDLError, '外線通話ができません。このエラーが表示され続ける場合は、{brandName} サポートにお問い合わせください。'), _webphoneErrors["default"].noOutboundCallWithoutDL, 'お使いの内線では現在、ブラウザーを使用した通話発信が許可されていません。アップグレードについてアカウント担当者にお問い合わせください。'), _webphoneErrors["default"].provisionUpdate, '申し訳ございませんが、こちら側で問題が発生しました。まもなく自動的に再接続を試みます。'), _webphoneErrors["default"].serverConnecting, '申し訳ございませんが、電話サーバーへの接続に問題があります。'), _webphoneErrors["default"].toVoiceMailError, '内部エラーにより、通話をボイスメールへ送信できません'), _webphoneErrors["default"].muteError, '現在、通話をミュートできません。'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, '現在、通話を保留できません。'), _webphoneErrors["default"].flipError, '通話をフリップできません。後でもう一度やり直してください。'), _webphoneErrors["default"].recordError, '現在、通話を録音できません。エラーコード：{errorCode}'), _webphoneErrors["default"].pauseRecordError, '申し訳ありません。通話の録音を停止できませんでした。後ほど再試行してください。'), _webphoneErrors["default"].recordDisabled, '申し訳ありません。お使いのアカウントでは、通話を録音する機能はサポートされていません。アカウント管理者にお問い合わせください。'), _webphoneErrors["default"].transferError, '通話を転送できません。後でもう一度やり直してください。'), _webphoneMessages["default"].parked, '通話は{parkedNumber}でパークされました'), "failWithStatusCode", '申し訳ございません。エラー{errorCode}が発生しました。問題が解決しない場合は、このエラーを{brandName}サポートに報告してください。'), "registeringWithStatusCode", '申し訳ありませんが、問題が発生しました。再接続しようとしています。問題が解決しない場合は、このエラーを{brandName}サポートに報告してください。エラーコード：{errorCode}'), "failWithoutStatusCode", '申し訳ありません。こちら側で問題が発生しました。エラーが解決しない場合は、このエラーを{brandName}サポートに報告してください。'), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", '申し訳ありませんが、問題が発生しました。再接続しようとしています。問題が解決しない場合は、このエラーを{brandName}サポートに報告してください。')); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Sorry, making calls using this browser is not supported."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.checkDLError]"@#@ @source: @#@"Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.provisionUpdate]"@#@ @source: @#@"Sorry, something went wrong on our end. We will automatically try to reconnect shortly."@#@
// @key: @#@"[webphoneErrors.serverConnecting]"@#@ @source: @#@"Sorry, we are having an issue connecting to the phone server."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
//# sourceMappingURL=ja-JP.js.map
