"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../../modules/ConnectivityManager");

var _connectivityTypes$ne;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, 'Lo sentimos, se produjo un error; verifique su conexión de red y vuelva a intentarlo.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, 'No se puede conectar al servidor. Vuelva a intentarlo más tarde.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, 'Lo sentimos, cometimos un error. Vuelva a intentarlo más tarde.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, 'Lo sentimos, cometimos un error, pero estamos trabajando arduamente para solucionarlo. Aún puede hacer llamadas, pero otras funciones están actualmente limitadas.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, 'Lo sentimos, cometimos un error, pero estamos trabajando arduamente para solucionarlo. Es posible que tenga acceso limitado a ciertas funciones. La aplicación se recuperará automáticamente tan pronto como esté disponible.'), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=es-419.js.map
