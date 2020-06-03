"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _connectivityTypes = _interopRequireDefault(require("../../../../modules/ConnectivityManager/connectivityTypes"));

var _connectivityTypes$ne;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].networkLoss, "Se produjo un error; compruebe la conexión de red e inténtelo de nuevo."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].offline, "No se puede conectar al servidor. Vuelva a intentarlo más tarde."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].serverUnavailable, "Se produjo un error por nuestra parte. Vuelva a intentarlo más tarde."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].voipOnly, "Se produjo un error por nuestra parte, pero estamos trabajando para solucionarlo. Aún puede realizar llamadas, pero otras funciones actualmente están limitadas."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].survival, "Se produjo un error por nuestra parte, pero estamos trabajando para solucionarlo. Es posible que tenga acceso limitado a determinadas funciones. La aplicación se recuperará automáticamente tan pronto como esté disponible."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
