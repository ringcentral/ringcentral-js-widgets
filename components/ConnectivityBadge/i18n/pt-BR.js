"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _connectivityTypes = _interopRequireDefault(require("ringcentral-widgets/modules/ConnectivityManager/connectivityTypes"));

var _connectivityTypes$we;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$we = {}, _defineProperty(_connectivityTypes$we, _connectivityTypes["default"].webphoneUnavailable, "Telefone da Web indisponível"), _defineProperty(_connectivityTypes$we, _connectivityTypes["default"].offline, "Offline"), _defineProperty(_connectivityTypes$we, _connectivityTypes["default"].voipOnly, "VoIP somente"), _defineProperty(_connectivityTypes$we, _connectivityTypes["default"].survival, "Modo limitado"), _connectivityTypes$we); // @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@


exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
