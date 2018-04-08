import { combineReducers } from 'redux';
import softphoneStatus from './softphoneStatus';

export function getSoftphoneStatusReducer(types) {
  return (state = softphoneStatus.idle, { type }) => {
    switch (type) {
      case types.startToConnect:
        return softphoneStatus.connecting;

      case types.connectComplete:
        return softphoneStatus.idle;

      default:
        return state;
    }
  };
}

export function getConnectingPhoneNumberReducer(types) {
  return (state = null, { type, phoneNumber }) => {
    switch (type) {
      case types.startToConnect:
        return phoneNumber;

      case types.connectComplete:
        return null;

      default:
        return state;
    }
  };
}

export default function getSoftphoneReducer(types) {
  return combineReducers({
    softphoneStatus: getSoftphoneStatusReducer(types),
    connectingPhoneNumber: getConnectingPhoneNumberReducer(types),
  });
}
