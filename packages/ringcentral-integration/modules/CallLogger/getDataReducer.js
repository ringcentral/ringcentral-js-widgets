import { combineReducers } from 'redux';

const DEFAULT_OPACITY = 20;

export function getLogOnRingingReducer(types) {
  return (state = true, { type, logOnRinging }) => {
    if (type === types.setLogOnRinging) return !!logOnRinging;
    return state;
  };
}

export function getAutoLogReducer(types, initialState = true) {
  return (state = initialState, { type, autoLog }) => {
    if (type === types.setAutoLog) return !!autoLog;
    return state;
  };
}

export function getTransferredCallsReducer(types, opacity = DEFAULT_OPACITY) {
  return (state = {}, { type, sessionId }) => {
    if (type === types.addTransferredCall) {
      if (Object.keys(state).length >= opacity) {
        const newState = {};
        for (let i = 1; i < Object.keys(state).length; i += 1) {
          const key = Object.keys(state)[i];
          newState[key] = state[key];
        }
        newState[sessionId] = true;
        return newState;
      }
      return {
        ...state,
        [sessionId]: true
      };
    }
    return state;
  };
}

/* istanbul ignore next */
export default function getDataReducer(types, initialState = {}) {
  return combineReducers({
    autoLog: getAutoLogReducer(types, initialState.autoLog),
    logOnRinging: getLogOnRingingReducer(types),
    transferredCallsMap: getTransferredCallsReducer(types)
  });
}
