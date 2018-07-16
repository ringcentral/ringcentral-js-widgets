import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';


export function getCallMatchedReducer(types) {
  return (state = {}, { type, sessionId, toEntityId }) => {
    if (type === types.setData) {
      return {
        ...state,
        [sessionId]: toEntityId,
      };
    }
    return state;
  };
}

/**
 * HACK: for conference call merging glitch
 */
export function getCachedCallsFromPresenceReducer(types) {
  return (state = null, { type, call }) => {
    switch (type) {
      case types.updateCallsCaching:
        if (Array.isArray(state)) {
          if (state.find(cachedCall => cachedCall.id === call.id)) {
            return state;
          }
          call.cached = true;
          return [...state, call];
        }
        call.cached = true;
        return [call];
      case types.clearCallsCaching:
      case types.reset:
        return null;
      default:
        return state;
    }
  };
}

/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
export default function getCallMonitorReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    cachedCallsFromPresence: getCachedCallsFromPresenceReducer(types),
  });
}
