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

], 'user');
