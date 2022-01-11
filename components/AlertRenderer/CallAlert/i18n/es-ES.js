"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _callErrors$emergency;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _callErrors["default"].emergencyNumber, "Las llamadas de emergencia no están disponibles. Use otro teléfono para ponerse en contacto con los servicios de emergencia."), _defineProperty(_callErrors$emergency, _callErrors["default"].noToNumber, "Introduzca un número de teléfono válido."), _defineProperty(_callErrors$emergency, _callErrors["default"].noAreaCode, "Establezca {areaCodeLink} para usar los números de teléfono locales de 7 dígitos."), _defineProperty(_callErrors$emergency, _callErrors["default"].connectFailed, "Error de conexión. Vuelva a intentarlo más tarde."), _defineProperty(_callErrors$emergency, _callErrors["default"].internalError, "Se ha producido un fallo en la conexión. Vuelva a intentarlo más tarde."), _defineProperty(_callErrors$emergency, _callErrors["default"].notAnExtension, "El número de la extensión no existe."), _defineProperty(_callErrors$emergency, _callErrors["default"].networkError, "No se puede conectar debido a problemas de red. Vuelva a intentarlo más tarde."), _defineProperty(_callErrors$emergency, _callErrors["default"].noInternational, "No tiene permisos suficientes para hacer esta llamada internacional. Póngase en contacto con el administrador de su cuenta de {brand} para conseguir una actualización."), _defineProperty(_callErrors$emergency, _callErrors["default"].noRingoutEnable, "Su extensión puede hacer llamadas con la app de escritorio.\n    Si desea acceder a otras opciones\n    póngase en contacto con el administrador de su cuenta para la actualización."), _defineProperty(_callErrors$emergency, "areaCode", "código de área"), _defineProperty(_callErrors$emergency, "telus911", "No se pueden hacer llamadas de emergencia."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@


exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
