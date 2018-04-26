import { combineReducers } from 'redux';

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

/* istanbul ignore next */
export default function getDataReducer(types, initialState = {}) {
  return combineReducers({
    autoLog: getAutoLogReducer(types, initialState.autoLog),
    logOnRinging: getLogOnRingingReducer(types),
  });
}
