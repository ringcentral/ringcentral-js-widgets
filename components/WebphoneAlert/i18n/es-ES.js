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

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.connectFailed, "Error al conectar con el servidor de telefonía web."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.connected, "Teléfono web registrado."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.browserNotSupported, "Las llamadas con el navegador solo se permiten en Chrome."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.webphoneCountOverLimit, "Se han podido registrar 5 teléfonos web en total."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.notOutboundCallWithoutDL, "En este momento, su extensión no puede realizar llamadas salientes con el navegador. Póngase en contacto con su representante de cuentas para acceder a una actualización."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.getSipProvisionError, "No tiene permiso para enviar este mensaje."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.toVoiceMailError, "No se puede enviar la llamada al buzón de voz debido a un error interno"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.muteError, "No se puede silenciar la llamada en este momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.holdError, "No se puede poner la llamada en espera en este momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.flipError, "No se puede traspasar la llamada. Vuelva a intentarlo más tarde."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.recordError, "No puede grabar la llamada en este momento. Código de error: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.recordDisabled, "Su cuenta no incluye la función para grabar llamadas. Póngase en contacto con el administrador de su cuenta."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.transferError, "No se puede transferir la llamada. Vuelva a intentarlo más tarde."), _defineProperty(_webphoneErrors$conne, "webphoneUnavailable", "{error}. Estamos volviendo a conectar con el servidor. Si el error persiste, póngase en contacto con el servicio técnico de {brandName}."), _defineProperty(_webphoneErrors$conne, "errorCode", "Código de error interno: {errorCode}"), _defineProperty(_webphoneErrors$conne, "occurs", "Se ha producido un error interno"), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
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
//# sourceMappingURL=es-ES.js.map
