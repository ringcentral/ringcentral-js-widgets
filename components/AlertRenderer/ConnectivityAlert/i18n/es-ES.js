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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, 'Se produjo un error; compruebe la conexión de red e inténtelo de nuevo.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, 'No se puede conectar al servidor. Vuelva a intentarlo más tarde.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, 'Se ha producido un error en nuestro sistema. Inténtelo de nuevo más tarde.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, 'Se produjo un error por nuestra parte, pero estamos trabajando para solucionarlo. Aún puede realizar llamadas, pero otras funciones actualmente están limitadas.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, 'Se ha producido un error en nuestro sistema, pero estamos trabajando para solucionarlo. Es posible que tenga acceso limitado a determinadas funciones. La aplicación se recuperará automáticamente tan pronto como esté disponible.'), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
