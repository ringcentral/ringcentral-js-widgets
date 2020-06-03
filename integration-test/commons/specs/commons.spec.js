"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _TestPhoneFactory = _interopRequireDefault(require("../TestPhoneFactory"));

var _testAccount = require("../config/testAccount");

var _regionSetting = _interopRequireDefault(require("../../spec-modules/regionSetting"));

var _numValidInCall = _interopRequireDefault(require("../../spec-modules/numValidInCall"));

var _callingSettings = _interopRequireDefault(require("../../spec-modules/callingSettings"));

var _composeText = _interopRequireDefault(require("../../spec-modules/composeText"));

var _rateLimiter = _interopRequireDefault(require("../../spec-modules/rateLimiter"));

var _blockedNumber = _interopRequireDefault(require("../../spec-modules/blockedNumber"));

var _forwardingNumber = _interopRequireDefault(require("../../spec-modules/forwardingNumber"));

var _extensionInfo = _interopRequireDefault(require("../../spec-modules/extensionInfo"));

var _accountInfo = _interopRequireDefault(require("../../spec-modules/accountInfo"));

var _dialingPlan = _interopRequireDefault(require("../../spec-modules/dialingPlan"));

var _rolesAndPermissions = _interopRequireDefault(require("../../spec-modules/rolesAndPermissions"));

var _extensionPhoneNumber = _interopRequireDefault(require("../../spec-modules/extensionPhoneNumber"));

var _presence = _interopRequireDefault(require("../../spec-modules/presence"));

var _conferenceCall = _interopRequireDefault(require("../../spec-modules/conferenceCall"));

var _availabilityMonitor = _interopRequireDefault(require("../../spec-modules/availabilityMonitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var phone = (0, _TestPhoneFactory["default"])();
(0, _numValidInCall["default"])(phone.auth, phone.alert, phone.client, phone.regionSettings, phone.call, _testAccount.multiDialingPlanIncludingUSCAAccount); // phone = getTestPhone();
// runCallLogTests(phone.auth, phone.client, phone.callLog, callLogAccount);

phone = (0, _TestPhoneFactory["default"])();
(0, _regionSetting["default"])(phone.auth, phone.client, phone.regionSettings, _testAccount.multiDialingPlanIncludingUSCAAccount);
phone = (0, _TestPhoneFactory["default"])();
(0, _callingSettings["default"])(phone.auth, phone.client, phone.alert, _testAccount.defaultAccount, phone.callingSettings, phone.extensionPhoneNumber, phone.extensionInfo);
phone = (0, _TestPhoneFactory["default"])();
(0, _composeText["default"])(phone.auth, phone.client, _testAccount.smsAccount, phone.alert, phone.regionSettings, phone.composeText, phone.messageSender);
phone = (0, _TestPhoneFactory["default"])();
(0, _rateLimiter["default"])(phone.auth, phone.alert, _testAccount.defaultAccount, phone.client, phone.rateLimiter);
phone = (0, _TestPhoneFactory["default"])();
(0, _blockedNumber["default"])(phone.auth, phone.client, phone.blockedNumber, _testAccount.defaultAccount);
phone = (0, _TestPhoneFactory["default"])();
(0, _forwardingNumber["default"])(phone.auth, phone.client, phone.forwardingNumber, _testAccount.defaultAccount);
phone = (0, _TestPhoneFactory["default"])();
(0, _extensionInfo["default"])(phone.auth, phone.client, phone.extensionInfo, _testAccount.defaultAccount, phone.alert);
phone = (0, _TestPhoneFactory["default"])();
(0, _accountInfo["default"])(phone.auth, phone.client, phone.accountInfo, _testAccount.defaultAccount, phone.alert);
phone = (0, _TestPhoneFactory["default"])();
(0, _dialingPlan["default"])(phone.auth, phone.client, phone.dialingPlan, _testAccount.defaultAccount);
phone = (0, _TestPhoneFactory["default"])();
(0, _rolesAndPermissions["default"])(phone.auth, phone.client, phone.rolesAndPermissions, _testAccount.defaultAccount, phone.alert);
phone = (0, _TestPhoneFactory["default"])();
(0, _extensionPhoneNumber["default"])(phone.auth, phone.client, phone.extensionPhoneNumber, _testAccount.defaultAccount);
phone = (0, _TestPhoneFactory["default"])();
(0, _presence["default"])(phone.auth, phone.client, phone.presence, _testAccount.defaultAccount);
phone = (0, _TestPhoneFactory["default"])();
(0, _conferenceCall["default"])(phone.auth, phone.client, phone.conferenceCall, phone.alert, _testAccount.defaultAccount);
phone = (0, _TestPhoneFactory["default"])();
(0, _availabilityMonitor["default"])(_objectSpread(_objectSpread({}, phone), {}, {
  account: _testAccount.defaultAccount
}));
//# sourceMappingURL=commons.spec.js.map
