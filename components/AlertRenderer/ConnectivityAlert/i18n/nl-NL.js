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

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].networkLoss, "Er is iets fout gegaan, controleer uw netwerkverbinding en probeer het opnieuw."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].offline, "Kan niet verbinden met de server. Probeer het later opnieuw."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].serverUnavailable, "Er is bij ons iets fout gegaan. Probeer het later opnieuw."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].voipOnly, "Er is bij ons iets fout gegaan. We zijn druk bezig om dit op te lossen. U kunt nog steeds bellen, maar andere functies zijn momenteel beperkt."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].survival, "Er is bij ons iets fout gegaan. We zijn druk bezig om dit op te lossen. U hebt beperkt toegang tot enkele functies. De app zal automatisch herstellen zodra deze beschikbaar is."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
