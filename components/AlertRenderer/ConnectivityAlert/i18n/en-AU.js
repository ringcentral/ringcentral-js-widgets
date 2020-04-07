"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _connectivityTypes = _interopRequireDefault(require("ringcentral-widgets/modules/ConnectivityManager/connectivityTypes"));

var _connectivityTypes$ne;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].networkLoss, "Sorry, something went wrong. Check your network connection and try again."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].offline, "Cannot connect to the server. Please retry later."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].serverUnavailable, "Sorry, something went wrong on our end. Try again later."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].voipOnly, "Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].survival, "Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it's available."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=en-AU.js.map
