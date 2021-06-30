import { combineReducers } from 'redux';
import getModuleStatusReducer from '@ringcentral-integration/commons/lib/getModuleStatusReducer';

export function getToNumberFieldReducer(types) {
  return (state = '', { type, phoneNumber }) => {
    switch (type) {
      case types.setToNumberField:
      case types.loadLastCallState:
      case types.call:
        return phoneNumber;
      case types.setRecipient:
      case types.clearToNumberField:
      case types.resetSuccess:
      case types.callSuccess:
        return '';
      default:
        return state;
    }
  };
}

export function getRecipientReducer(types) {
  return (state = null, { type, recipient }) => {
    switch (type) {
      case types.setRecipient:
      case types.loadLastCallState:
      case types.call:
        return recipient;
      case types.clearRecipient:
      case types.resetSuccess:
      case types.callSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getIsLastInputFromDialpadReducer(types) {
  return (state = false, { type, fromDialPad = false }) => {
    switch (type) {
      case types.setToNumberField:
        return fromDialPad;
      case types.clearToNumberField:
      case types.setRecipient:
      case types.clearRecipient:
      case types.loadLastCallState:
      case types.call:
      case types.resetSuccess:
      case types.callSuccess:
        return false;
      default:
        return state;
    }
  };
}

export default function getReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    toNumberField: getToNumberFieldReducer(types),
    recipient: getRecipientReducer(types),
    isLastInputFromDialpad: getIsLastInputFromDialpadReducer(types),
  });
}
