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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_webphoneErrors$conne = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, 'Las funciones del teléfono no están disponibles actualmente. Inténtelo de nuevo más tarde. '), _webphoneErrors["default"].connected, 'Teléfono web registrado.'), _webphoneErrors["default"].browserNotSupported, 'No es posible realizar llamadas a través de este navegador.'), _webphoneErrors["default"].webphoneCountOverLimit, 'Se han podido registrar 5 teléfonos web en total.'), _webphoneErrors["default"].checkDLError, 'No es posible realizar una llamada saliente. Si el error persiste, póngase en contacto con{brandName}para obtener asistencia.'), _webphoneErrors["default"].noOutboundCallWithoutDL, 'En este momento, su extensión no puede realizar llamadas salientes con el navegador. Póngase en contacto con su representante de cuentas para acceder a una actualización.'), _webphoneErrors["default"].provisionUpdate, 'Se ha producido un error en nuestro sistema. Intentaremos restablecer la conexión automáticamente.'), _webphoneErrors["default"].serverConnecting, 'Tenemos un problema con la conexión al servidor del teléfono.'), _webphoneErrors["default"].toVoiceMailError, 'No se puede enviar la llamada al buzón de voz debido a un error interno'), _webphoneErrors["default"].muteError, 'No se puede silenciar la llamada en este momento.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, 'No se puede poner la llamada en espera en este momento.'), _webphoneErrors["default"].flipError, 'No se puede traspasar la llamada. Inténtelo de nuevo más tarde.'), _webphoneErrors["default"].recordError, 'No puede grabar la llamada en este momento. Código de error:{errorCode}.'), _webphoneErrors["default"].pauseRecordError, 'Lo sentimos, no pudimos dejar de grabar la llamada. Inténtelo de nuevo más tarde.'), _webphoneErrors["default"].recordDisabled, 'Su cuenta no incluye la función para grabar llamadas. Contacte con el administrador de la cuenta.'), _webphoneErrors["default"].transferError, 'No se puede transferir la llamada. Inténtelo de nuevo más tarde.'), _webphoneMessages["default"].parked, 'Su llamada se ha puesto en espera en la ubicación siguiente:{parkedNumber}'), "failWithStatusCode", 'Hemos encontrado un error:{errorCode}. Si el problema persiste, póngase en contacto con el soporte técnico de{brandName}.'), "registeringWithStatusCode", 'Se ha producido un error. Estamos intentando restablecer la conexión. Si el problema persiste, póngase en contacto con el soporte técnico de{brandName}. Código de error:{errorCode}.'), "failWithoutStatusCode", 'Se ha producido un error en nuestro sistema. Si el error persiste, póngase en contacto con el soporte técnico de{brandName}.'), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", 'Se ha producido un error. Estamos intentando restablecer la conexión. Si el problema persiste, póngase en contacto con el soporte técnico de{brandName}.')); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
//# sourceMappingURL=es-ES.js.map
