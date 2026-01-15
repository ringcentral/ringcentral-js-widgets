"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _CallingSettings.callingSettingsMessages.saveSuccess, 'Settings saved successfully.'), _CallingSettings.callingSettingsMessages.saveSuccessWithSoftphone, 'Settings saved successfully. Please make sure you have {brand} installed in your computer.'), _CallingSettings.callingSettingsMessages.permissionChanged, 'Your permissions have been changed recently. Please go to {link} to check your Calling options.'), _CallingSettings.callingSettingsMessages.phoneNumberChanged, 'Your phone number information has been changed recently. Please go to {link} to check your Calling options.'), "link", 'Settings > Calling'), _CallingSettings.callingSettingsMessages.webphonePermissionRemoved, 'Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator.'), _CallingSettings.callingSettingsMessages.emergencyCallingNotAvailable, 'Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number.'), _CallingSettings.callingSettingsMessages.saveSuccessWithJupiter, 'Settings saved successfully. Please make sure you have {brand} installed in your computer.'), _CallingSettings.callingSettingsMessages.disableEmergencyInJapan, 'Emergency service is not available in Japan.');
//# sourceMappingURL=en-US.js.map
