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

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.connectFailed, "Connection with web phone server failed."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.connected, "Web phone registered."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.browserNotSupported, "Calling via browser is only supported on Chrome."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.webphoneCountOverLimit, "A maximum of five web phones can be registered."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.notOutboundCallWithoutDL, "Your extension is currently not allowed to make outbound calls with browser. Please contact your account representative for an upgrade."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.getSipProvisionError, "You do not have permission to send messages."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.toVoiceMailError, "Cannot send call to voicemail due to internal error"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.muteError, "Call cannot be muted at the moment."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.holdError, "Call cannot be held at the moment."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.flipError, "Cannot flip the call. Please try again later."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.recordError, "You cannot record the call at the moment. Error code: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.recordDisabled, "Sorry, your account does not have the feature to record a call. Please contact your account administrator."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.transferError, "Cannot transfer the call. Please try again later."), _defineProperty(_webphoneErrors$conne, "webphoneUnavailable", "{error}. We are reconnecting to the server. If the error persists, please report this error to {brandName} Support."), _defineProperty(_webphoneErrors$conne, "errorCode", "Internal error code: {errorCode}"), _defineProperty(_webphoneErrors$conne, "occurs", "Internal error occurs"), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
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
//# sourceMappingURL=en-GB.js.map
