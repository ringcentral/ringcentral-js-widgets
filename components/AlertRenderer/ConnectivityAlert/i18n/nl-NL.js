"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../../modules/ConnectivityManager");

var _connectivityTypes$ne;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, "Er is iets fout gegaan. Controleer uw netwerkverbinding en probeer het opnieuw."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, "Kan niet verbinden met de server. Probeer het later opnieuw."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, "Er is bij ons iets fout gegaan. Probeer het later opnieuw."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, "Er is bij ons iets fout gegaan. We zijn druk bezig om dit op te lossen. U kunt nog steeds bellen, maar andere functies zijn momenteel beperkt."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, "Er is bij ons iets fout gegaan. We zijn druk bezig om dit op te lossen. U hebt beperkt toegang tot enkele functies. De app zal automatisch herstellen zodra deze beschikbaar is."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
