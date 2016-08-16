'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getUserReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _userActions = require('./user-actions');

var _userActions2 = _interopRequireDefault(_userActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  accountInfo: null,
  accountInfoLoading: false,
  accountInfoError: null,

  extensionInfo: null,
  extensionInfoLoading: false,
  extensionInfoError: null,

  dialingPlans: [],
  dialingPlansLoading: false,
  dialingPlansError: null,

  phoneNumbers: [],
  phoneNumbersLoading: false,
  phoneNumbersError: null,

  forwardingNumbers: [],
  forwardingNumbersLoading: false,
  forwardingNumbersError: null,

  blockedNumbers: [],
  blockedNumbersLoading: false,
  blockedNumbersError: null
};

function getUserReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_userActions2.default, prefix);
  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {

      // account info
      case actions.loadAccountInfo:
        return (0, _assign2.default)({}, state, {
          accountInfoLoading: true
        });
      case actions.loadAccountInfoSuccess:
        return (0, _assign2.default)({}, state, {
          accountInfo: action.payload,
          accountInfoLoading: false,
          accountInfoError: null
        });
      case actions.loadAccountInfoFailed:
        return (0, _assign2.default)({}, state, {
          accountInfoLoading: false,
          accountInfoError: action.error
        });

      // extension info
      case actions.loadExtensionInfo:
        return (0, _assign2.default)({}, state, {
          extensionInfoLoading: true
        });
      case actions.loadExtensionInfoSuccess:
        return (0, _assign2.default)({}, state, {
          extensionInfo: action.payload,
          extensionInfoLoading: false,
          extensionInfoError: null
        });
      case actions.loadExtensionInfoFailed:
        return (0, _assign2.default)({}, state, {
          extensionInfoLoading: false,
          extensionInfoError: action.error
        });

      // dialing plans
      case actions.loadDialingPlans:
        return (0, _assign2.default)({}, state, {
          dialingPlansLoading: true
        });
      case actions.loadDialingPlansSuccess:
        return (0, _assign2.default)({}, state, {
          dialingPlansLoading: false,
          dialingPlans: action.payload
        });
      case action.loadDialingPlansFailed:
        return (0, _assign2.default)({}, state, {
          dialingPlansLoading: false,
          dialingPlansError: action.error
        });

      // phone numbers
      case actions.loadPhoneNumbers:
        return (0, _assign2.default)({}, state, {
          phoneNumbersLoading: true
        });
      case actions.loadPhoneNumbersSuccess:
        return (0, _assign2.default)({}, state, {
          phoneNumbersLoading: false,
          phoneNumbers: action.payload
        });
      case action.loadPhoneNumbersFailed:
        return (0, _assign2.default)({}, state, {
          phoneNumbersLoading: false,
          phoneNumbersError: action.error
        });

      // forwarding numbers
      case actions.loadForwardingNumbers:
        return (0, _assign2.default)({}, state, {
          forwardingNumbersLoading: true
        });
      case actions.loadForwardingNumbersSuccess:
        return (0, _assign2.default)({}, state, {
          forwardingNumbersLoading: false,
          forwardingNumbers: action.payload
        });
      case action.loadForwardingNumbersFailed:
        return (0, _assign2.default)({}, state, {
          forwardingNumbersLoading: false,
          forwardingNumbersError: action.error
        });

      // blocked numbers
      case actions.loadBlockedNumbers:
        return (0, _assign2.default)({}, state, {
          blockedNumbersLoading: true
        });
      case actions.loadBlockedNumbersSuccess:
        return (0, _assign2.default)({}, state, {
          blockedNumbersLoading: false,
          blockedNumbers: action.payload
        });
      case action.loadBlockedNumbersFailed:
        return (0, _assign2.default)({}, state, {
          blockedNumbersLoading: false,
          blockedNumbersError: action.error
        });

      case action.clearUserInfo:
        return (0, _assign2.default)({}, initialState);

      default:
        return state;
    }
  };
}
//# sourceMappingURL=user-reducer.js.map
