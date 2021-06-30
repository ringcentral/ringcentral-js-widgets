"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../modules/ConnectivityManager");

var _connectivityTypes$we;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$we = {}, _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.webphoneUnavailable, 'Web Phone Unavailable'), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.offline, 'Offline'), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.voipOnly, 'VoIP Only'), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.survival, 'Limited Mode'), _defineProperty(_connectivityTypes$we, _ConnectivityManager.connectivityTypes.connecting, 'Connecting'), _connectivityTypes$we);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
