import { combineReducers } from 'redux';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';

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

export default function getReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    toNumberField: getToNumberFieldReducer(types),
    recipient: getRecipientReducer(types),
  });
}
