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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = (_webphoneErrors$conne = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, 'Sorry, phone features are currently unavailable. Please retry later. '), _webphoneErrors["default"].connected, 'Web phone registered.'), _webphoneErrors["default"].browserNotSupported, 'Sorry, making calls using this browser is not supported.'), _webphoneErrors["default"].webphoneCountOverLimit, 'A maximum of 5 web phones could be registered.'), _webphoneErrors["default"].checkDLError, 'Unable to make outgoing call. Contact {brandName} for support if this error keeps showing.'), _webphoneErrors["default"].noOutboundCallWithoutDL, 'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.'), _webphoneErrors["default"].provisionUpdate, 'Sorry, something went wrong on our end. We will automatically try to reconnect shortly.'), _webphoneErrors["default"].serverConnecting, 'Sorry, we are having an issue connecting to the phone server.'), _webphoneErrors["default"].toVoiceMailError, 'Cannot send call to voicemail due to internal error'), _webphoneErrors["default"].muteError, 'Call cannot be muted at the moment.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, 'Call cannot be hold at the moment.'), _webphoneErrors["default"].flipError, 'Cannot flip the call. Please try again later.'), _webphoneErrors["default"].recordError, 'You cannot record the call at the moment. Error code: {errorCode}'), _webphoneErrors["default"].pauseRecordError, "Sorry, we weren't able to stop recording the call. Try again later."), _webphoneErrors["default"].recordDisabled, 'Sorry, your account does not have the feature to record a call. Please contact your account administrator.'), _webphoneErrors["default"].transferError, 'Cannot transfer the call. Please try again later.'), _webphoneMessages["default"].parked, 'Your call is parked at location: {parkedNumber}'), "failWithStatusCode", "Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."), "registeringWithStatusCode", 'Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}.'), "failWithoutStatusCode", 'Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support.'), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", 'Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support.'));
//# sourceMappingURL=en-US.js.map
