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
var _ConnectivityManager = require("../../../../modules/ConnectivityManager");
var _connectivityTypes$ne;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, "Se produjo un error; compruebe la conexión de red e inténtelo de nuevo."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, "No se puede conectar al servidor. Vuelva a intentarlo más tarde."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, "Se ha producido un error en nuestro sistema. Vuelva a intentarlo más tarde."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, "Se produjo un error por nuestra parte, pero estamos trabajando para solucionarlo. Aún puede realizar llamadas, pero otras funciones actualmente están limitadas."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, "Se ha producido un error en nuestro sistema, pero estamos trabajando para solucionarlo. Es posible que tenga acceso limitado a determinadas funciones. La aplicación se recuperará automáticamente tan pronto como esté disponible."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
