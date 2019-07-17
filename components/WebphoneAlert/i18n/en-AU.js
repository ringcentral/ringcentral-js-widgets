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

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Sorry, phone features are currently unavailable. Please retry later. "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Web phone registered."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Sorry, making calls using this browser is not supported."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "A maximum of 5 web phones could be registered."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "Your extension is currently not allowed to make outbound calls with browser. Please contact your account representative for an upgrade."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "Sorry, something went wrong on our end. We will automatically try to reconnect shortly."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "Sorry, we are having an issue with connecting to the phone server."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "Cannot send call to voicemail due to internal error"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "Call cannot be muted at the moment."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "Call cannot be held at the moment."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "Cannot flip the call. Please try again later."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "You cannot record the call at the moment. Error code: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "Sorry, your account does not have the feature to record a call. Please contact your account administrator."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "Cannot transfer the call. Please try again later."), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "Sorry, we have encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@


exports["default"] = _default;
//# sourceMappingURL=en-AU.js.map
