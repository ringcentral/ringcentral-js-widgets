"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));
var _webphoneMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneMessages"));
var _webphoneErrors$conne;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Le funzioni telefoniche non sono attualmente disponibili. Riprova più tardi. "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Telefono web registrato."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Le chiamate mediante questo browser non sono supportate."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "È possibile registrare fino a 5 telefoni web."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "Impossibile effettuare una chiamata in uscita. Se l'errore persiste, contatta {brandName} per assistenza."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "Con questo interno non è attualmente consentito effettuare chiamate in uscita con il browser. Contatta il rappresentante dell'account per un upgrade."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "Si è verificato un problema nei nostri sistemi. Tenteremo la riconnessione automatica a breve."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "Si è verificato un problema durante la connessione al server telefonico."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "Errore interno: impossibile inviare la chiamata alla segreteria telefonica"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "Impossibile disattivare l'audio della chiamata in questo momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "Impossibile mettere in attesa la chiamata in questo momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "Impossibile commutare la chiamata. Riprova più tardi."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "Non è possibile registrare la chiamata in questo momento. Codice errore: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].pauseRecordError, "Non è stato possibile interrompere la registrazione della chiamata. Riprova più tardi."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "La funzione di registrazione chiamata non è disponibile nel tuo account. Contatta l'amministratore del tuo account."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "Impossibile trasferire la chiamata. Riprova più tardi."), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, "La tua chiamata è parcheggiata nella posizione: {parkedNumber}"), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "Abbiamo riscontrato un errore: {errorCode}. Se il problema persiste, segnala l'errore all'assistenza {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "Si è verificato un problema. Tentativo di riconnessione. Se il problema persiste, segnala l'errore all'assistenza {brandName}. Codice errore: {errorCode}."), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "Si è verificato un problema nei nostri sistemi. Se l'errore persiste, segnala il problema all'assistenza {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "Si è verificato un problema. Tentativo di riconnessione. Se il problema persiste, segnala l'errore all'assistenza {brandName}."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
