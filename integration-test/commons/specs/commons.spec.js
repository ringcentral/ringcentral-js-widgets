'use strict';

var _TestPhoneFactory = require('../TestPhoneFactory');

var _TestPhoneFactory2 = _interopRequireDefault(_TestPhoneFactory);

var _testAccount = require('../config/testAccount');

var _regionSetting = require('../../spec-modules/regionSetting');

var _regionSetting2 = _interopRequireDefault(_regionSetting);

var _numValidInCall = require('../../spec-modules/numValidInCall');

var _numValidInCall2 = _interopRequireDefault(_numValidInCall);

var _callingSettings = require('../../spec-modules/callingSettings');

var _callingSettings2 = _interopRequireDefault(_callingSettings);

var _composeText = require('../../spec-modules/composeText');

var _composeText2 = _interopRequireDefault(_composeText);

var _rateLimiter = require('../../spec-modules/rateLimiter');

var _rateLimiter2 = _interopRequireDefault(_rateLimiter);

var _blockedNumber = require('../../spec-modules/blockedNumber');

var _blockedNumber2 = _interopRequireDefault(_blockedNumber);

var _forwardingNumber = require('../../spec-modules/forwardingNumber');

var _forwardingNumber2 = _interopRequireDefault(_forwardingNumber);

var _accountExtension = require('../../spec-modules/accountExtension');

var _accountExtension2 = _interopRequireDefault(_accountExtension);

var _accountPhoneNumber = require('../../spec-modules/accountPhoneNumber');

var _accountPhoneNumber2 = _interopRequireDefault(_accountPhoneNumber);

var _extensionInfo = require('../../spec-modules/extensionInfo');

var _extensionInfo2 = _interopRequireDefault(_extensionInfo);

var _accountInfo = require('../../spec-modules/accountInfo');

var _accountInfo2 = _interopRequireDefault(_accountInfo);

var _dialingPlan = require('../../spec-modules/dialingPlan');

var _dialingPlan2 = _interopRequireDefault(_dialingPlan);

var _rolesAndPermissions = require('../../spec-modules/rolesAndPermissions');

var _rolesAndPermissions2 = _interopRequireDefault(_rolesAndPermissions);

var _extensionPhoneNumber = require('../../spec-modules/extensionPhoneNumber');

var _extensionPhoneNumber2 = _interopRequireDefault(_extensionPhoneNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import runCallLogTests from '../../spec-modules/callLog';
var phone = (0, _TestPhoneFactory2.default)();
(0, _numValidInCall2.default)(phone.auth, phone.alert, phone.client, phone.regionSettings, phone.call, _testAccount.multiDialingPlanIncludingUSCAAccount);

// phone = getTestPhone();
// runCallLogTests(phone.auth, phone.client, phone.callLog, callLogAccount);

phone = (0, _TestPhoneFactory2.default)();
(0, _regionSetting2.default)(phone.auth, phone.client, phone.regionSettings, _testAccount.multiDialingPlanIncludingUSCAAccount);

phone = (0, _TestPhoneFactory2.default)();
(0, _callingSettings2.default)(phone.auth, phone.client, phone.alert, _testAccount.defaultAccount, phone.callingSettings, phone.extensionPhoneNumber, phone.extensionInfo);

phone = (0, _TestPhoneFactory2.default)();
(0, _composeText2.default)(phone.auth, phone.client, _testAccount.smsAccount, phone.alert, phone.regionSettings, phone.composeText, phone.messageSender);

phone = (0, _TestPhoneFactory2.default)();
(0, _rateLimiter2.default)(phone.auth, phone.alert, _testAccount.defaultAccount, phone.client, phone.rateLimiter);

phone = (0, _TestPhoneFactory2.default)();
(0, _blockedNumber2.default)(phone.auth, phone.client, phone.blockedNumber, _testAccount.defaultAccount);

phone = (0, _TestPhoneFactory2.default)();
(0, _forwardingNumber2.default)(phone.auth, phone.client, phone.forwardingNumber, _testAccount.defaultAccount);

phone = (0, _TestPhoneFactory2.default)();
(0, _accountExtension2.default)(phone.auth, phone.client, phone.accountExtension, _testAccount.defaultAccount);

phone = (0, _TestPhoneFactory2.default)();
(0, _accountPhoneNumber2.default)(phone.auth, phone.client, phone.accountPhoneNumber, _testAccount.defaultAccount);

phone = (0, _TestPhoneFactory2.default)();
(0, _extensionInfo2.default)(phone.auth, phone.client, phone.extensionInfo, _testAccount.defaultAccount, phone.alert);

phone = (0, _TestPhoneFactory2.default)();
(0, _accountInfo2.default)(phone.auth, phone.client, phone.accountInfo, _testAccount.defaultAccount, phone.alert);

phone = (0, _TestPhoneFactory2.default)();
(0, _dialingPlan2.default)(phone.auth, phone.client, phone.dialingPlan, _testAccount.defaultAccount);

phone = (0, _TestPhoneFactory2.default)();
(0, _rolesAndPermissions2.default)(phone.auth, phone.client, phone.rolesAndPermissions, _testAccount.defaultAccount, phone.alert);

phone = (0, _TestPhoneFactory2.default)();
(0, _extensionPhoneNumber2.default)(phone.auth, phone.client, phone.extensionPhoneNumber, _testAccount.defaultAccount);
//# sourceMappingURL=commons.spec.js.map
