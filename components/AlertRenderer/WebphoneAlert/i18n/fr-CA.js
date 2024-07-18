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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Désolés, les fonctionnalités du téléphone ne sont pas disponibles pour le moment. Veuillez réessayer plus tard. "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Téléphone Web enregistré."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Désolés, les appels effectués à l’aide de ce navigateur ne sont pas pris en charge."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "Jusqu’à 5 téléphones Web peuvent être enregistrés."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "Impossible de passer un appel téléphonique sortant. Communiquez avec {brandName} pour obtenir du soutien si cette erreur persiste."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "Votre poste n’est pas autorisé à faire des appels sortants avec le navigateur pour le moment. Veuillez communiquer avec votre représentant de compte pour obtenir une mise à niveau."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "Désolés, une erreur s’est produite de notre côté. Nous allons automatiquement essayer de vous reconnecter sous peu."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "Désolés, nous rencontrons un problème de connexion au serveur téléphonique."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "Impossible d’acheminer l’appel vers la messagerie vocale en raison d’une erreur interne"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "Le son de l’appel ne peut être désactivé pour le moment."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "L’appel ne peut être mis en attente pour le moment."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "Impossible de renvoyer l’appel. Veuillez réessayer plus tard."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "Vous ne pouvez pas enregistrer l’appel pour le moment. Code d’erreur : {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].pauseRecordError, "Désolés, nous n’avons pas pu arrêter l’enregistrement de l’appel. Réessayez plus tard."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "Désolés, votre compte ne possède pas la fonctionnalité pour enregistrer un appel. Veuillez communiquer avec votre administrateur de compte."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "Impossible de transférer l’appel. Veuillez réessayer plus tard."), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, "Votre appel est parqué à : {parkedNumber}"), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "Désolés, nous avons rencontré une erreur : {errorCode}. Si le problème persiste, signalez au service de soutien de {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "Désolés, une erreur s’est produite. Nous essayons de vous reconnecter. Si le problème persiste, veuillez le signaler au service de soutien de {brandName}. Code d’erreur : {errorCode}."), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "Désolés, une erreur s’est produite de notre côté. Si l’erreur persiste, veuillez la signaler au service de soutien de {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "Désolés, une erreur s’est produite. Nous essayons de vous reconnecter. Si le problème persiste, veuillez le signaler au service de soutien de {brandName}."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
//# sourceMappingURL=fr-CA.js.map
