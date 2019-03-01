import { combineReducers } from 'redux';
import AvailabilityStatus from './availabilityStatus';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function isLimitedAvailabilityModeReducer(types) {
  return (state = { mode: AvailabilityStatus.NORMAL }, { type }) => {
    switch (type) {
      case types.limitedMode: {
        return { mode: AvailabilityStatus.LIMITED };
      }
      case types.normalMode: {
        return { mode: AvailabilityStatus.NORMAL };
      }
      default:
        return state;
    }
  };
}

export function isAppInitialErrorModeReducer(types) {
  return (state = { mode: AvailabilityStatus.NORMAL }, { type }) => {
    switch (type) {
      case types.appInitialError: {
        return { mode: AvailabilityStatus.APP_INITIAL_ERROR };
      }
      case types.normalMode: {
        return { mode: AvailabilityStatus.NORMAL };
      }
      default:
        return state;
    }
  };
}

export default function AvailabilityMonitorReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    isLimitedAvailabilityMode: isLimitedAvailabilityModeReducer(types),
    isAppInitialError: isAppInitialErrorModeReducer(types),
  });
}
