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
var _default = exports["default"] = (_webphoneErrors$conne = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, 'Lo sentimos, las funciones del teléfono no están disponibles en este momento. Inténtelo de nuevo más tarde. '), _webphoneErrors["default"].connected, 'Teléfono web registrado.'), _webphoneErrors["default"].browserNotSupported, 'Lo sentimos, no es posible hacer llamadas con este navegador.'), _webphoneErrors["default"].webphoneCountOverLimit, 'Se pueden registrar 5 teléfonos web como máximo.'), _webphoneErrors["default"].checkDLError, 'No se pudo realizar una llamada saliente. Comuníquese con {brandName} para obtener asistencia si este error continúa apareciendo.'), _webphoneErrors["default"].noOutboundCallWithoutDL, 'En este momento, su extensión no puede hacer llamadas salientes con navegador, comuníquese con su representante para acceder a la actualización.'), _webphoneErrors["default"].provisionUpdate, 'Se produjo un error en nuestro sistema. Intentaremos volver a conectar rápidamente.'), _webphoneErrors["default"].serverConnecting, 'Lo sentimos, tenemos un problema para conectar al servidor telefónico.'), _webphoneErrors["default"].toVoiceMailError, 'No se puede enviar la llamada al buzón de voz debido a un error interno'), _webphoneErrors["default"].muteError, 'No se puede silenciar la llamada en este momento.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, 'No se puede poner la llamada en espera en este momento.'), _webphoneErrors["default"].flipError, 'No se puede voltear la llamada. Inténtelo de nuevo más tarde.'), _webphoneErrors["default"].recordError, 'No puede grabar la llamada en este momento. Código de error: {errorCode}'), _webphoneErrors["default"].pauseRecordError, 'Lo sentimos, no pudimos detener la grabación de la llamada. Inténtelo de nuevo más tarde.'), _webphoneErrors["default"].recordDisabled, 'Su cuenta no incluye la función de grabar llamadas. Comuníquese con el administrador de su cuenta.'), _webphoneErrors["default"].transferError, 'No se puede transferir la llamada. Inténtelo de nuevo más tarde.'), _webphoneMessages["default"].parked, 'Su llamada se recuperó en la ubicación: {parkedNumber}'), "failWithStatusCode", 'Lo sentimos, hemos detectado un error: {errorCode}. Si el problema persiste, comuníquelo al servicio técnico de {brandName}.'), "registeringWithStatusCode", 'Lo sentimos, cometimos un error. Estamos intentando volver a conectar. Si el problema persiste, comuníquelo al servicio técnico de {brandName}. Código de error: {errorCode}.'), "failWithoutStatusCode", 'Se produjo un error en nuestro sistema. Si el error persiste, comuníquelo al servicio técnico de {brandName}.'), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", 'Lo sentimos, cometimos un error. Estamos intentando volver a conectar. Si el problema persiste, comuníquelo al servicio técnico de {brandName}.')); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
//# sourceMappingURL=es-419.js.map
