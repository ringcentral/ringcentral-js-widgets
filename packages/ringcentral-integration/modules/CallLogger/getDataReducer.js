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
  return (state = [], { type, sessionId, transferredMiddleNumber }) => {
    if (type === types.addTransferredCall) {
      return [
        ...(state.slice(state.length >= opacity ? 1 : 0, opacity)),
        { [sessionId]: { transferredMiddleNumber } }
      ];
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
