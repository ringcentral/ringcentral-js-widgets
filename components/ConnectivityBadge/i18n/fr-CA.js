"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../modules/ConnectivityManager");

var _connectivityTypes$we;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$we = {}, _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.webphoneUnavailable, "Téléphone Web non disponible"), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.offline, "Hors ligne"), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.voipOnly, "VoIP seulement"), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.survival, "Mode limité"), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.connecting, "Connexion"), _connectivityTypes$we); // @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@
// @key: @#@"[connectivityTypes.connecting]"@#@ @source: @#@"Connecting"@#@


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
