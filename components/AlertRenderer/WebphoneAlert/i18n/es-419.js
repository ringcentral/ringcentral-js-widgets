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
var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Lo sentimos, las funciones del teléfono no están disponibles en este momento. Inténtelo de nuevo más tarde. "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Teléfono web registrado."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Lo sentimos, no es posible hacer llamadas con este navegador."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "Se pueden registrar 5 teléfonos web como máximo."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "No se pudo realizar una llamada saliente. Comuníquese con {brandName} para obtener asistencia si este error continúa apareciendo."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "En este momento, su extensión no puede hacer llamadas salientes con navegador, comuníquese con su representante para acceder a la actualización."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "Se produjo un error en nuestro sistema. Intentaremos volver a conectar rápidamente."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "Lo sentimos, tenemos un problema para conectar al servidor telefónico."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "No se puede enviar la llamada al buzón debido a un error interno"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "No se puede silenciar la llamada en este momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "No se puede poner la llamada en espera en este momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "No se puede voltear la llamada. Inténtelo de nuevo más tarde."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "No puede grabar la llamada en este momento. Código de error: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].pauseRecordError, "Lo sentimos, no pudimos detener la grabación de la llamada. Inténtelo de nuevo más tarde."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "Su cuenta no incluye la función de grabar llamadas. Comuníquese con el administrador de su cuenta."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "No se puede transferir la llamada. Inténtelo de nuevo más tarde."), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, "Su llamada se recuperó en la ubicación: {parkedNumber}"), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "Lo sentimos, hemos detectado un error: {errorCode}. Si el problema persiste, comuníquelo al servicio técnico de {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "Lo sentimos, cometimos un error. Estamos intentando volver a conectar. Si el problema persiste, comuníquelo al servicio técnico de {brandName}. Código de error: {errorCode}."), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "Se produjo un error en nuestro sistema. Si el error persiste, comuníquelo al servicio técnico de {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "Lo sentimos, cometimos un error. Estamos intentando volver a conectar. Si el problema persiste, comuníquelo al servicio técnico de {brandName}."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
//# sourceMappingURL=es-419.js.map
