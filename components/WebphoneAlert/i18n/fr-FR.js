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

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Échec de la connexion avec le serveur du téléphone Web."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Web phone enregistré."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Appeler avec un navigateur est pris en charge uniquement sur Chrome."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "Il est possible d'enregistrer jusqu'à 5 appels."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "Votre extension n'est actuellement pas autorisée à passer des appels sortants via un navigateur, veuillez contacter votre représentant de compte pour une mise à niveau."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "Impossible de joindre la messagerie vocale à cause d'une erreur interne"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "Le son de l'appel ne peut pas être désactivé pour le moment."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "L'appel ne peut pas être mis en attente pour le moment."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "Renvoi de l'appel impossible. Veuillez réessayer plus tard."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "Vous ne pouvez pas enregistrer l'appel pour le moment. Code d'erreur : {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "Désolé, votre compte ne comprend pas la fonction permettant d'enregistrer un appel. Veuillez contacter votre administrateur de compte."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "Impossible de transférer l'appel. Veuillez réessayer plus tard."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
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
//# sourceMappingURL=fr-FR.js.map
