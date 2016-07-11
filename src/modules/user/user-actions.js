import { ActionMap } from '../../lib/redux-helper';

export default new ActionMap([
  'clearUserInfo',

  'loadAccountInfo',
  'loadAccountInfoSuccess',
  'loadAccountInfoFailed',

  'loadExtensionInfo',
  'loadExtensionInfoSuccess',
  'loadExtensionInfoFailed',

  'loadDialingPlans',
  'loadDialingPlansSuccess',
  'loadDialingPlansFailed',

  'loadPhoneNumbers',
  'loadPhoneNumbersSuccess',
  'loadPhoneNumbersFailed',

  'loadForwardingNumbers',
  'loadForwardingNumbersSuccess',
  'loadForwardingNumbersFailed',

  'loadBlockedNumbers',
  'loadBlockedNumbersSuccess',
  'loadBlockedNumbersFailed',


  'login',
  'loginSuccess',
  'loginError',
  'logout',
  'logoutSuccess',
  'logoutError',
  'refresh',
  'refreshSuccess',
  'refreshError',
  'init',
], 'user');
