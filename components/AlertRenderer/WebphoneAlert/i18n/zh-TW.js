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
var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));
var _webphoneMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneMessages"));
var _webphoneErrors$conne;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "抱歉，電話功能目前不可用。請稍後再試一次。 "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "網路電話已註冊。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "抱歉，不支援使用此瀏覽器撥打電話。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "可註冊最多 5 支網路電話。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "無法撥出電話。如果此錯誤持續發生，請聯絡 {brandName} 尋求支援。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "您的分機目前不允許使用瀏覽器撥出電話，請聯絡您的帳戶代表進行升級。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "抱歉，系統發生錯誤。我們很快就會自動嘗試重新連線。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "抱歉，連線至電話伺服器時發生問題。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "因為發生內部錯誤，無法將通話轉至語音信箱"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "目前無法靜音。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "目前無法保留通話。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "無法轉接通話。請稍後再試。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "目前無法對通話進行錄音。錯誤代碼：{errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].pauseRecordError, "抱歉，我們無法停止通話錄音。請稍後再試一次。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "抱歉，您的帳戶並不具進行通話錄音的功能。請聯絡您的帳戶管理員。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "無法轉接通話。請稍後再試。"), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, "您的通話寄存位置為：{parkedNumber}"), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "抱歉，我們遇到了錯誤：{errorCode}。如果問題仍然存在，請向 {brandName} 支援人員回報此錯誤。"), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "抱歉，發生錯誤。我們正在嘗試重新連線。如果問題仍然存在，請向 {brandName} 支援人員回報此錯誤。錯誤代碼：{errorCode}。"), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "抱歉，系統發生錯誤。如果錯誤仍然存在，請向 {brandName} 支援人員回報此錯誤。"), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "抱歉，發生錯誤。我們正在嘗試重新連線。如果問題仍然存在，請向 {brandName} 支援人員回報此錯誤。"), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
exports["default"] = _default;
//# sourceMappingURL=zh-TW.js.map
