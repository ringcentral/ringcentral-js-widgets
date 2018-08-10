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

exports.default = (_webphoneErrors$conne = {}, (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.connectFailed, "與網路電話伺服器的連線失敗。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.connected, "網路電話已註冊。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.browserNotSupported, "僅支援在 Chrome 上使用瀏覽器撥號。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.webphoneCountOverLimit, "可註冊最多 5 支網路電話。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.notOutboundCallWithoutDL, "您的分機目前不允許使用瀏覽器進行撥出通話，請聯絡您的帳戶代表進行升級。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.getSipProvisionError, "您沒有傳送訊息的權限。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.toVoiceMailError, "因為發生內部錯誤，無法將通話傳送到語音信箱"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.muteError, "目前無法靜音。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.holdError, "目前無法保留。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.flipError, "無法轉接通話。請稍後再試一次。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.recordError, "目前無法對通話進行錄音。錯誤代碼：{errorCode}"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.recordDisabled, "抱歉，您的帳戶並不具進行通話錄音的功能。請聯絡您的帳戶管理員。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.transferError, "無法轉接通話。請稍後再試一次。"), (0, _defineProperty3.default)(_webphoneErrors$conne, "webphoneUnavailable", "{error}。我們正在重新連線至伺服器。若錯誤持續存在，請將這個錯誤回報至 {brandName} 支援部門。"), (0, _defineProperty3.default)(_webphoneErrors$conne, "errorCode", "內部錯誤代碼：{errorCode}"), (0, _defineProperty3.default)(_webphoneErrors$conne, "occurs", "發生內部錯誤"), _webphoneErrors$conne);

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
//# sourceMappingURL=zh-TW.js.map
