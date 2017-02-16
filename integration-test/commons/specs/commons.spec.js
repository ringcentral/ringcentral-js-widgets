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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phone = (0, _TestPhoneFactory2.default)();

// import runCallLogTests from '../../spec-modules/callLog';

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
//# sourceMappingURL=commons.spec.js.map
