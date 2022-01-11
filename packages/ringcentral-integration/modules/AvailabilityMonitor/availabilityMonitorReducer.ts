import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function hasLimitedStatusErrorReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.limitedModeStatusError: {
        return true;
      }
      case types.normalMode: {
        return false;
      }
      default:
        return state;
    }
  };
}

export function isLimitedModeReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.limitedMode: {
        return true;
      }
      case types.normalMode: {
        return false;
      }
      default:
        return state;
    }
  };
}

export function isVoIPOnlyModeReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.VoIPOnlyMode: {
        return true;
      }
      case types.VoIPOnlyReset: {
        return false;
      }
      case types.normalMode: {
        return false;
      }
      default:
        return state;
    }
  };
}

export default function AvailabilityMonitorReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    hasLimitedStatusError: hasLimitedStatusErrorReducer(types),
    isLimitedMode: isLimitedModeReducer(types),
    isVoIPOnlyMode: isVoIPOnlyModeReducer(types),
  });
}
