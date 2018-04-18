import { combineReducers } from 'redux';

function getCallsMappingReducer(types) {
  return (state = {}, { type, call, sessionId }) => {
    switch (type) {
      case types.update:
        return {
          ...state,
          [sessionId]: {
            ...state[sessionId],
            ...call
          }
        };
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getTasksMappingReducer(types) {
  return (state = {}, { type, task, sessionId }) => {
    switch (type) {
      case types.update:
        return {
          ...state,
          [sessionId]: {
            ...state[sessionId],
            ...task
          }
        };
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getShowLogSectionReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.showLogSection:
        return true;
      case types.hideLogSection:
        return false;
      default:
        return state;
    }
  };
}

function getCurrentSessionIdReducer(types) {
  return (state = null, { type, sessionId }) => {
    switch (type) {
      case types.showLogSection:
        return sessionId;
      case types.hideLogSection:
        return null;
      default:
        return state;
    }
  };
}

export default function getStorageReducer(types) {
  return combineReducers({
    calls: getCallsMappingReducer(types),
    tasks: getTasksMappingReducer(types),
    show: getShowLogSectionReducer(types),
    currentSessionId: getCurrentSessionIdReducer(types),
  });
}
