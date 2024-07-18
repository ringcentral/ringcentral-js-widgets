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
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _callErrors$emergency;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, 'Las llamadas de emergencia no están disponibles. Use otro teléfono para ponerse en contacto con los servicios de emergencia.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, 'Indique un número de teléfono válido.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, 'Establezca {areaCodeLink} para usar los números de teléfono locales de 7 dígitos.'), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, 'Error de conexión. Inténtelo de nuevo más tarde.'), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, 'Se ha producido un fallo en la conexión. Inténtelo de nuevo más tarde.'), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, 'El número de la extensión no existe.'), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, 'No se puede conectar debido a problemas de red. Inténtelo de nuevo más tarde.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, 'No tiene permisos suficientes para hacer esta llamada internacional. Póngase en contacto con el administrador de su cuenta de {brand} para conseguir una actualización.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, 'Su extensión puede hacer llamadas con la app de escritorio.\n    Si desea acceder a otras opciones\n    póngase en contacto con el administrador de su cuenta para la actualización.'), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, 'Lo sentimos, se ha producido un error. Inténtelo de nuevo más tarde.'), _defineProperty(_callErrors$emergency, "areaCode", 'prefijo'), _defineProperty(_callErrors$emergency, "telus911", 'No se pueden hacer llamadas de emergencia.'), _defineProperty(_callErrors$emergency, _Call.callErrors.fromAndToNumberIsSame, 'El número de RingOut y el número de destino no pueden ser el mismo. Actualice el número e inténtelo de nuevo.'), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
// @key: @#@"[callErrors.fromAndToNumberIsSame]"@#@ @source: @#@"The RingOut number and destination number can't be the same. Please update the number and try again."@#@
exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
