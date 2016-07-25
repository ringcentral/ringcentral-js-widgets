import { prefixActions } from '../../lib/redux-helper';
import userActions from './user-actions';

const initialState = {
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
  blockedNumbersError: null,
};

export default function getUserReducer(prefix) {
  const actions = prefixActions(userActions, prefix);
  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {

      // account info
      case actions.loadAccountInfo:
        return Object.assign(
          {},
          state,
          {
            accountInfoLoading: true,
          },
        );
      case actions.loadAccountInfoSuccess:
        return Object.assign(
          {},
          state,
          {
            accountInfo: action.payload,
            accountInfoLoading: false,
            accountInfoError: null,
          },
        );
      case actions.loadAccountInfoFailed:
        return Object.assign(
          {},
          state,
          {
            accountInfoLoading: false,
            accountInfoError: action.error,
          },
        );

      // extension info
      case actions.loadExtensionInfo:
        return Object.assign(
          {},
          state,
          {
            extensionInfoLoading: true,
          },
        );
      case actions.loadExtensionInfoSuccess:
        return Object.assign(
          {},
          state,
          {
            extensionInfo: action.payload,
            extensionInfoLoading: false,
            extensionInfoError: null,
          },
        );
      case actions.loadExtensionInfoFailed:
        return Object.assign(
          {},
          state,
          {
            extensionInfoLoading: false,
            extensionInfoError: action.error,
          },
        );

      // dialing plans
      case actions.loadDialingPlans:
        return Object.assign(
          {},
          state,
          {
            dialingPlansLoading: true,
          },
        );
      case actions.loadDialingPlansSuccess:
        return Object.assign(
          {},
          state,
          {
            dialingPlansLoading: false,
            dialingPlans: action.payload,
          },
        );
      case action.loadDialingPlansFailed:
        return Object.assign(
          {},
          state,
          {
            dialingPlansLoading: false,
            dialingPlansError: action.error,
          },
        );


      // phone numbers
      case actions.loadPhoneNumbers:
        return Object.assign(
          {},
          state,
          {
            phoneNumbersLoading: true,
          },
        );
      case actions.loadPhoneNumbersSuccess:
        return Object.assign(
          {},
          state,
          {
            phoneNumbersLoading: false,
            phoneNumbers: action.payload,
          },
        );
      case action.loadPhoneNumbersFailed:
        return Object.assign(
          {},
          state,
          {
            phoneNumbersLoading: false,
            phoneNumbersError: action.error,
          },
        );

      // forwarding numbers
      case actions.loadForwardingNumbers:
        return Object.assign(
          {},
          state,
          {
            forwardingNumbersLoading: true,
          },
        );
      case actions.loadForwardingNumbersSuccess:
        return Object.assign(
          {},
          state,
          {
            forwardingNumbersLoading: false,
            forwardingNumbers: action.payload,
          },
        );
      case action.loadForwardingNumbersFailed:
        return Object.assign(
          {},
          state,
          {
            forwardingNumbersLoading: false,
            forwardingNumbersError: action.error,
          },
        );

      // blocked numbers
      case actions.loadBlockedNumbers:
        return Object.assign(
          {},
          state,
          {
            blockedNumbersLoading: true,
          },
        );
      case actions.loadBlockedNumbersSuccess:
        return Object.assign(
          {},
          state,
          {
            blockedNumbersLoading: false,
            blockedNumbers: action.payload,
          },
        );
      case action.loadBlockedNumbersFailed:
        return Object.assign(
          {},
          state,
          {
            blockedNumbersLoading: false,
            blockedNumbersError: action.error,
          },
        );

      case action.clearUserInfo:
        return Object.assign(
          {},
          initialState,
        );

      default:
        return state;
    }
  };
}
