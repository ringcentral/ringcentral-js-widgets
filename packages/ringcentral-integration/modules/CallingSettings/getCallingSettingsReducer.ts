import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getCallWithReducer(types) {
  return (state = null, { type, callWith = state }) => {
    if (type === types.setData) return callWith;
    return state;
  };
}

export function getRingoutPromptReducer(types) {
  return (state = true, { type, ringoutPrompt = state }) => {
    if (type === types.setData) return ringoutPrompt;
    return state;
  };
}

export function getMyLocationReducer(types) {
  return (state = '', { type, myLocation = state }) => {
    if (type === types.setData) return myLocation;
    return state;
  };
}

export function getIsCustomLocationReducer(types) {
  return (state = false, { type, isCustomLocation = state }) => {
    if (type === types.setData) return isCustomLocation;
    return state;
  };
}

export function getTimestampReducer(types) {
  return (state = null, { type, timestamp = state }) => {
    if (type === types.setData) return timestamp;
    return state;
  };
}

export function getFromNumberReducer(types) {
  return (state = null, { type, number }) => {
    switch (type) {
      case types.updateFromNumber:
        return number;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getCallingSettingsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
  });
}

export function getCallingSettingsStorageReducer(types) {
  return combineReducers({
    callWith: getCallWithReducer(types),
    ringoutPrompt: getRingoutPromptReducer(types),
    myLocation: getMyLocationReducer(types),
    isCustomLocation: getIsCustomLocationReducer(types),
    fromNumber: getFromNumberReducer(types),
    timestamp: getTimestampReducer(types),
  });
}
