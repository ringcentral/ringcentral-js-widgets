"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));

var _webphoneMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneMessages"));

var _webphoneErrors$conne;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Leider sind Telefonfunktionen zurzeit nicht verfügbar. Bitte versuchen Sie es später erneut. "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Das Webtelefon wurde registriert."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Das Tätigen von Anrufen mit diesem Browser wird leider nicht unterstützt."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "Maximal fünf Webtelefone können registriert werden."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "Der ausgehende Anruf konnte nicht getätigt werden. Wenden Sie sich an {brandName}, um Unterstützung zu erhalten, wenn dieser Fehler weiterhin angezeigt wird."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "Ihre Durchwahl ist aktuell nicht dazu berechtigt, ausgehende Anrufe über den Browser zu tätigen. Wenden Sie sich bitte an Ihren Kontoadministrator, um ein Upgrade zu erhalten."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "Leider ist auf unserer Seite ein Fehler aufgetreten. Wir versuchen in Kürze automatisch, die Verbindung neu herzustellen."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "Leider ist ein Problem beim Herstellen einer Verbindung mit dem Telefonserver aufgetreten."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "Der Anruf konnte wegen eines internen Fehlers nicht an die Voicemail geleitet werden."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "Der Anruf kann im Moment nicht stummgeschaltet werden."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "Der Anruf kann im Moment nicht gehalten werden."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "Der Anruf kann nicht umgelegt werden. Versuchen Sie es später erneut."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "Sie können den Anruf gegenwärtig nicht aufzeichnen. Fehlercode: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "Ihr Konto verfügt über keine Funktion zum Aufzeichnen von Anrufen. Wenden Sie sich an Ihren Kontoadministrator."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "Der Anruf kann nicht weitergeleitet werden. Versuchen Sie es später erneut."), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, "Ihr Anruf ist an folgendem Ort geparkt: {parkedNumber}"), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "Leider ist bei uns ein Fehler aufgetreten: {errorCode}. Sollte das Problem weiterhin bestehen, melden Sie es an den {brandName}-Kundendienst."), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "Leider ist ein Fehler aufgetreten. Wir versuchen, die Verbindung neu herzustellen. Sollte das Problem weiterhin bestehen, melden Sie es bitte an den {brandName}-Kundendienst. Fehlercode: {errorCode}."), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "Leider ist auf unserer Seite ein Fehler aufgetreten. Sollte dieser Fehler weiterhin bestehen, melden Sie ihn an den {brandName}-Kundendienst."), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "Leider ist ein Fehler aufgetreten. Wir versuchen, die Verbindung neu herzustellen. Sollte das Problem weiterhin bestehen, melden Sie es bitte an den {brandName}-Kundendienst."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
