"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _webphoneErrors = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/webphoneErrors"));

var _webphoneErrors$conne;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "網路電話已註冊。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "可註冊最多 5 支網路電話。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "您的分機目前不允許使用瀏覽器進行撥出通話，請聯絡您的帳號代表進行升級。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "因為發生內部錯誤，無法將通話轉語音信箱"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "目前無法靜音。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "目前無法保留。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "無法翻轉通話。請稍後再試一次。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "目前無法對通話進行錄音。錯誤代碼：{errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "抱歉，您的帳號並不具進行通話錄音的功能。請聯絡您的帳戶管理員。"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "無法轉接通話。請稍後再試一次。"), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
