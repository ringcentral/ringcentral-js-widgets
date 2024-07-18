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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, 'Emergency calling is not available. Please use another phone to contact emergency services'), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, 'Please enter a valid phone number.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, 'Please set {areaCodeLink} to use 7-digit local phone numbers.'), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, 'Connection failed. Please try again later.'), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, 'Cannot connect due to internal errors. Please try again later.'), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, 'The extension number does not exist.'), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, 'Cannot connect due to network issues. Please try again later.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, "You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, 'Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade.'), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, 'Sorry, there was a problem on our end. Please try again later.'), _defineProperty(_callErrors$emergency, "areaCode", 'area code'), _defineProperty(_callErrors$emergency, "telus911", 'Emergency dialing is not supported.'), _defineProperty(_callErrors$emergency, _Call.callErrors.fromAndToNumberIsSame, "The RingOut number and destination number can't be the same. Please update the number and try again."), _callErrors$emergency);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
