"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../../modules/ConnectivityManager");

var _connectivityTypes$ne;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, "Désolé, une erreur s'est produite, vérifiez votre connexion réseau et réessayez."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, "Impossible d'accéder au serveur. Veuillez réessayer plus tard."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, "Désolé, une erreur s'est produite de notre côté. Réessayez plus tard."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, "Désolé, une erreur s'est produite de notre côté, mais nous nous efforçons de la corriger. Vous pouvez toujours passer des appels, mais les autres fonctions sont actuellement limitées."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, "Désolé, une erreur s'est produite de notre côté, mais nous nous efforçons de la corriger. Vous pouvez avoir un accès limité à certaines fonctionnalités. L'application se rétablira automatiquement dès qu'elle sera disponible."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
