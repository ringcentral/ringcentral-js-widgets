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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, "Las llamadas de emergencia no están disponibles. Use otro teléfono para ponerse en contacto con los servicios de emergencia."), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, "Indique un número de teléfono válido."), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, "Establezca {areaCodeLink} para usar los números de teléfono locales de 7 dígitos."), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, "Error de conexión. Inténtelo de nuevo más tarde."), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, "Se ha producido un fallo en la conexión. Inténtelo de nuevo más tarde."), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, "El número de la extensión no existe."), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, "No se puede conectar debido a problemas de red. Inténtelo de nuevo más tarde."), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, "No tiene permisos suficientes para hacer esta llamada internacional. Póngase en contacto con el administrador de su cuenta de {brand} para conseguir una actualización."), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, "Su extensión puede hacer llamadas con la app de escritorio.\n    Si desea acceder a otras opciones\n    póngase en contacto con el administrador de su cuenta para la actualización."), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, "Lo sentimos, se ha producido un error. Inténtelo de nuevo más tarde."), _defineProperty(_callErrors$emergency, "areaCode", "prefijo"), _defineProperty(_callErrors$emergency, "telus911", "No se pueden hacer llamadas de emergencia."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
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
exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
