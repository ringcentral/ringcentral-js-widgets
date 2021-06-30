"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../../modules/ConnectivityManager");

var _connectivityTypes$ne;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, 'Algo deu errado. Verifique sua conexão de rede e tente novamente.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, 'Não é possível conectar ao servidor. Tente mais tarde.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, 'Algo deu errado do nosso lado. Tente novamente mais tarde.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, 'Algo deu errado do nosso lado, mas estamos trabalhando para corrigir o problema. Você ainda pode fazer chamadas, mas outras funções estão limitadas no momento.'), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, 'Algo deu errado do nosso lado, mas estamos trabalhando para corrigir o problema. Você pode ter acesso limitado a alguns recursos. O aplicativo será recuperado automaticamente assim que estiver disponível.'), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
