'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userEventTypes = exports.userEvents = undefined;

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventDefinitions = {
  userInfoLoaded: 'USER_INFO_LOADED',
  userInfoCleared: 'USER_INFO_CLEARED',

  loadAccountInfo: 'LOAD_ACCOUNT_INFO',
  loadAccountInfoSuccess: 'LOAD_ACCOUNT_INFO_SUCCESS',
  loadAccountInfoFailed: 'LOAD_ACCOUNT_INFO_FAILED',

  loadExtensionInfo: 'LOAD_EXTENSION_INFO',
  loadExtensionInfoSuccess: 'LOAD_EXTENSION_INFO_SUCCESS',
  loadExtensionInfoFailed: 'LOAD_EXTENSION_INFO_FAILED',

  loadDialingPlans: 'LOAD_DIALING_PLANS',
  loadDialingPlansSuccess: 'LOAD_DIALING_PLANS_SUCCESS',
  loadDialingPlansFailed: 'LOAD_DIALING_PLANS_FAILED',

  loadPhoneNumbers: 'LOAD_PHONE_NUMBERS',
  loadPhoneNumbersSuccess: 'LOAD_PHONE_NUMBERS_SUCCESS',
  loadPhoneNumbersFailed: 'LOAD_PHONE_NUMBERS_FAILED',

  loadForwardingNumbers: 'LOAD_FORWARDING_NUMBERS',
  loadForwardingNumbersSuccess: 'LOAD_FORWARDING_NUMBERS_SUCCESS',
  loadForwardingNumbersFailed: 'LOAD_FORWARDING_NUMBERS_FAILED',

  loadBlockedNumbers: 'LOAD_BLOCKED_NUMBERS',
  loadBlockedNumbersSuccess: 'LOAD_BLOCKED_NUMBERS_SUCCESS',
  loadBlockedNumbersFailed: 'LOAD_BLOCKED_NUMBERS_FAILED'
};

var userEvents = exports.userEvents = new _keyValueMap2.default(eventDefinitions);

var eventTypeDefinitions = {
  userInfoChange: 'USER_INFO_CHANGE'
};

var userEventTypes = exports.userEventTypes = new _keyValueMap2.default(eventTypeDefinitions);
//# sourceMappingURL=user-events.js.map
