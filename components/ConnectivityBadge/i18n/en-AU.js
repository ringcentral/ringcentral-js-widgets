"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../modules/ConnectivityManager");

var _connectivityTypes$we;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$we = {}, _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.webphoneUnavailable, 'Web phone unavailable'), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.offline, 'Offline'), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.voipOnly, 'VoIP only'), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.survival, 'Limited mode'), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.connecting, 'Connecting'), _connectivityTypes$we); // @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@
// @key: @#@"[connectivityTypes.connecting]"@#@ @source: @#@"Connecting"@#@


exports["default"] = _default;
//# sourceMappingURL=en-AU.js.map
