import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import callStatus from './callStatus';

export function getCallStatusReducer(types) {
  return (state = callStatus.idle, { type }) => {
    switch (type) {
      case types.connect:
        return callStatus.connecting;

      case types.connectSuccess:
      case types.connectError:
        return callStatus.idle;

      default:
        return state;
    }
  };
}

export function getToNumberEntitiesReducer(types) {
  return (state = [], { type, data }) => {
    switch (type) {
      case types.toNumberMatched:
        return [...state, data];
      case types.cleanToNumberEntities:
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getLastPhoneNumberReducer(types) {
  return (state = null, { type, phoneNumber = null }) => {
    switch (type) {
      case types.connect:
        return phoneNumber;
      default:
        return state;
    }
  };
}
export function getLastRecipientReducer(types) {
  return (state = null, { type, recipient = null }) => {
    switch (type) {
      case types.connect:
        return recipient;
      default:
        return state;
    }
  };
}

export default function getCallReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    callStatus: getCallStatusReducer(types),
    toNumberEntities: getToNumberEntitiesReducer(types),
  });
}
