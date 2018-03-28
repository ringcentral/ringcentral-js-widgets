import { combineReducers } from 'redux';
import getModuleStatusReducer from '../getModuleStatusReducer';

export function getDefaultDataReducer(types) {
  return (state = null, {
    type,
    data,
    cleanOnReset = false,
    hasPermission = true
  }) => {
    switch (type) {
      case types.fetchSuccess:
        return data;
      case types.initSuccess:
        if (hasPermission) {
          return state;
        }
        return null;
      case types.resetSuccess:
        if (cleanOnReset) {
          return null;
        }
        return state;
      default:
        return state;
    }
  };
}

export function getDefaultTimestampReducer(types) {
  return (state = null, { type, timestamp, cleanOnReset }) => {
    switch (type) {
      case types.fetchSuccess:
        return timestamp;
      case types.resetSuccess:
        if (cleanOnReset) {
          return null;
        }
        return state;
      default:
        return state;
    }
  };
}

export default function getDataFetcherReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
  });
}
