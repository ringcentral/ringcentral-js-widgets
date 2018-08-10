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

exports.default = (_webphoneErrors$conne = {}, (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.connectFailed, "与网络电话服务器连接失败。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.connected, "网络电话已注册。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.browserNotSupported, "只支持在 Chrome 浏览器上进行呼叫。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.webphoneCountOverLimit, "最多可注册 5 个网络电话。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.notOutboundCallWithoutDL, "当前您的分机不允许通过浏览器呼出电话，请联系您的账户代表进行升级。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.getSipProvisionError, "您没有权限发送消息。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.toVoiceMailError, "由于内部错误，无法发送通话到语音信箱"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.muteError, "当前无法静音。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.holdError, "当前无法保留。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.flipError, "无法切换通话。请稍后再试。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.recordError, "当前无法录音通话。错误代码：{errorCode}"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.recordDisabled, "抱歉，您的账户没有通话录音功能。请联系您的账户管理员。"), (0, _defineProperty3.default)(_webphoneErrors$conne, _webphoneErrors2.default.transferError, "无法转移通话。请稍后再试。"), (0, _defineProperty3.default)(_webphoneErrors$conne, "webphoneUnavailable", "{error}。我们正在重新连接至服务器。如果错误仍然存在，请将此错误报告给 {brandName} 支持部门。"), (0, _defineProperty3.default)(_webphoneErrors$conne, "errorCode", "内部错误代码：{errorCode}"), (0, _defineProperty3.default)(_webphoneErrors$conne, "occurs", "发生内部错误"), _webphoneErrors$conne);

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
//# sourceMappingURL=zh-CN.js.map
