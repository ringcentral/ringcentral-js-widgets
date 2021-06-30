"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../../modules/ConnectivityManager");

var _connectivityTypes$ne;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, 'Lamentamos, mas ocorreu um erro. Verifique a ligação de rede e tente novamente.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, 'Não é possível ligar ao servidor. Tente novamente mais tarde.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, 'Lamentamos, mas ocorreu um erro do nosso lado. Tente novamente mais tarde.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, 'Lamentamos, mas ocorreu um erro do nosso lado que estamos a tentar solucionar. Pode continuar a efetuar chamadas mas, de momento, outras funções estão limitadas.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, 'Lamentamos, mas ocorreu um erro do nosso lado que estamos a tentar solucionar. Algumas funcionalidades podem ter acesso limitado. A aplicação irá recuperar automaticamente assim que estiver disponível.'), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
