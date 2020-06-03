"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _connectivityTypes = _interopRequireDefault(require("../../../modules/ConnectivityManager/connectivityTypes"));

var _connectivityTypes$we;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$we = {}, _defineProperty(_connectivityTypes$we, _connectivityTypes["default"].webphoneUnavailable, 'Web Phone Unavailable'), _defineProperty(_connectivityTypes$we, _connectivityTypes["default"].offline, 'Offline'), _defineProperty(_connectivityTypes$we, _connectivityTypes["default"].voipOnly, 'VoIP Only'), _defineProperty(_connectivityTypes$we, _connectivityTypes["default"].survival, 'Limited Mode'), _connectivityTypes$we);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
