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

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Las funciones del teléfono no están disponibles actualmente. Vuelva a intentarlo más tarde. "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Teléfono web registrado."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "No es posible realizar llamadas a través de este navegador."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "Se han podido registrar 5 teléfonos web en total."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "No es posible realizar una llamada saliente. Si el error persiste, póngase en contacto con {brandName} para obtener asistencia."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "En este momento, su extensión no puede realizar llamadas salientes con el navegador. Póngase en contacto con su representante de cuentas para acceder a una actualización."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "Se produjo un error por nuestra parte. Intentaremos restablecer la conexión automáticamente."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "Tenemos un problema con la conexión al servidor del teléfono."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "No se puede enviar la llamada al buzón de voz debido a un error interno"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "No se puede silenciar la llamada en este momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "No se puede poner la llamada en espera en este momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "No se puede traspasar la llamada. Vuelva a intentarlo más tarde."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "No puede grabar la llamada en este momento. Código de error: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "Su cuenta no incluye la función para grabar llamadas. Póngase en contacto con el administrador de su cuenta."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "No se puede transferir la llamada. Vuelva a intentarlo más tarde."), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, "Su llamada se ha puesto en espera en la ubicación siguiente: {parkedNumber}"), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "Hemos encontrado un error: {errorCode}. Si el problema persiste, póngase en contacto con el soporte técnico de {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "Se produjo un error. Estamos intentando restablecer la conexión. Si el problema persiste, póngase en contacto con el soporte técnico de {brandName}. Código de error: {errorCode}."), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "Se produjo un error por nuestra parte. Si el error persiste, póngase en contacto con el soporte técnico de {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "Se produjo un error. Estamos intentando restablecer la conexión. Si el problema persiste, póngase en contacto con el soporte técnico de {brandName}."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
//# sourceMappingURL=es-ES.js.map
