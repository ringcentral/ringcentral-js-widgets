"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _callErrors$emergency;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, 'Emergency calling is not available. Please use another phone to contact emergency services'), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, 'Please enter a valid phone number.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, 'Please set {areaCodeLink} to use 7-digit local phone numbers.'), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, 'Connection failed. Please try again later.'), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, 'Cannot connect due to internal errors. Please try again later.'), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, 'The extension number does not exist.'), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, 'Cannot connect due to network issues. Please try again later.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, "You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, 'Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade.'), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, 'Sorry, there was a problem on our end. Please try again later.'), _defineProperty(_callErrors$emergency, "areaCode", 'area code'), _defineProperty(_callErrors$emergency, "telus911", 'Emergency dialing is not supported.'), _callErrors$emergency);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
