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

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Connessione al server di telefonia web non riuscita."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Telefono web registrato."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Le chiamate da browser sono supportate solo in Chrome."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "È possibile registrare fino a 5 telefoni web."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "Con questo interno non è attualmente consentito effettuare chiamate in uscita con il browser. Contatta il rappresentante dell'account per un aggiornamento"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "Impossibile inviare la chiamata alla segreteria telefonica a causa di un errore interno"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "Impossibile disattivare l'audio della chiamata in questo momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "Impossibile mettere in attesa la chiamata in questo momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "Impossibile commutare la chiamata. Riprova più tardi."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "Non è possibile registrare la chiamata in questo momento. Codice errore: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "La funzione di registrazione chiamata non è disponibile nel tuo account. Contatta l'amministratore del tuo account."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "Impossibile trasferire la chiamata. Riprova più tardi."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
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
// @key: @#@"webphoneUnavailable"@#@ @source: @#@"{error}. We are reconnecting to server. If the error persists, please report this error to {brandName} Support."@#@
// @key: @#@"errorCode"@#@ @source: @#@"Internal error code: {errorCode}"@#@
// @key: @#@"occurs"@#@ @source: @#@"Internal error occurs"@#@


exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
