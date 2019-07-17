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

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Le funzioni telefoniche non sono attualmente disponibili. Riprova più tardi. "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Telefono web registrato."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Le chiamate mediante questo browser non sono supportate."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "È possibile registrare fino a 5 telefoni web."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "Impossibile effettuare una chiamata in uscita. Se l'errore persiste, contatta {brandName} per assistenza."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "Con questo interno non è attualmente consentito effettuare chiamate in uscita con il browser. Contatta il rappresentante dell'account per un aggiornamento"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "Spiacenti, si è verificato un problema. Tenteremo la riconnessione automatica a breve."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "Si è verificato un problema durante la connessione al server telefonico."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "Impossibile inviare la chiamata alla segreteria telefonica a causa di un errore interno"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "Impossibile disattivare l'audio della chiamata in questo momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "Impossibile mettere in attesa la chiamata in questo momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "Impossibile commutare la chiamata. Riprova più tardi."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "Non è possibile registrare la chiamata in questo momento. Codice errore: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "La funzione di registrazione chiamata non è disponibile nel tuo account. Contatta l'amministratore del tuo account."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "Impossibile trasferire la chiamata. Riprova più tardi."), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "Abbiamo riscontrato un errore: {errorCode}. Se il problema persiste, segnala l'errore all'assistenza {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "Si è verificato un problema. Tentativo di riconnessione. Se il problema persiste, segnala l'errore all'assistenza {brandName}. Codice errore: {errorCode}."), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "Spiacenti, si è verificato un problema. Se l'errore persiste, segnala il problema all'assistenza {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "Si è verificato un problema. Tentativo di riconnessione. Se il problema persiste, segnala l'errore all'assistenza {brandName}."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
//# sourceMappingURL=it-IT.js.map
