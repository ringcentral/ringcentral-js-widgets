'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _webphoneErrors$conne;

var _webphoneErrors = require('ringcentral-integration/modules/Webphone/webphoneErrors');

var _webphoneErrors2 = _interopRequireDefault(_webphoneErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_webphoneErrors$conne = {}, (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.connectFailed, '\u30A6\u30A7\u30D6\u96FB\u8A71\u30B5\u30FC\u30D0\u30FC\u3068\u306E\u63A5\u7D9A\u304C\u5931\u6557\u3057\u307E\u3057\u305F\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.connected, '\u30A6\u30A7\u30D6\u96FB\u8A71\u306F\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.browserNotSupported, '\u30D6\u30E9\u30A6\u30B6\u30FC\u3092\u4F7F\u7528\u3057\u305F\u901A\u8A71\u306F\u3001Chrome\u306E\u307F\u3067\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u3059\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.webphoneCountOverLimit, '\u767B\u9332\u3067\u304D\u308B\u30A6\u30A7\u30D6\u96FB\u8A71\u306F\u6700\u59275\u53F0\u3067\u3059\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.notOutboundCallWithoutDL, '\u304A\u4F7F\u3044\u306E\u5185\u7DDA\u306F\u3001\u73FE\u5728\u3001\u30D6\u30E9\u30A6\u30B6\u30FC\u3092\u4F7F\u7528\u3057\u305F\u901A\u8A71\u767A\u4FE1\u3092\u8A31\u53EF\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u30A2\u30C3\u30D7\u30B0\u30EC\u30FC\u30C9\u306B\u3064\u3044\u3066\u30A2\u30AB\u30A6\u30F3\u30C8\u62C5\u5F53\u8005\u306B\u304A\u554F\u3044\u5408\u308F\u305B\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.getSipProvisionError, '\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u9001\u4FE1\u3059\u308B\u305F\u3081\u306E\u30A2\u30AF\u30BB\u30B9\u8A31\u53EF\u304C\u3042\u308A\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.toVoiceMailError, '\u5185\u90E8\u30A8\u30E9\u30FC\u306B\u3088\u308A\u3001\u901A\u8A71\u3092\u30DC\u30A4\u30B9\u30E1\u30FC\u30EB\u306B\u9001\u4FE1\u3067\u304D\u307E\u305B\u3093'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.muteError, '\u73FE\u5728\u3001\u901A\u8A71\u3092\u30DF\u30E5\u30FC\u30C8\u3067\u304D\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.holdError, '\u73FE\u5728\u3001\u901A\u8A71\u3092\u4FDD\u7559\u3067\u304D\u307E\u305B\u3093\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.flipError, '\u901A\u8A71\u3092\u30D5\u30EA\u30C3\u30D7\u3067\u304D\u307E\u305B\u3093\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.recordError, '\u73FE\u5728\u3001\u901A\u8A71\u3092\u9332\u97F3\u3067\u304D\u307E\u305B\u3093\u3002\u30A8\u30E9\u30FC\u30B3\u30FC\u30C9\uFF1A{errorCode}'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.recordDisabled, '\u7533\u3057\u8A33\u3042\u308A\u307E\u305B\u3093\u3002\u304A\u4F7F\u3044\u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u3067\u306F\u3001\u901A\u8A71\u3092\u9332\u97F3\u3059\u308B\u6A5F\u80FD\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406\u8005\u306B\u304A\u554F\u3044\u5408\u308F\u305B\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.transferError, '\u901A\u8A71\u3092\u8EE2\u9001\u3067\u304D\u307E\u305B\u3093\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), _webphoneErrors$conne);

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
//# sourceMappingURL=ja-JP.js.map
