import { combineReducers } from 'redux';

export function getLastActionReducer({ types }) {
  return (state = null, { type, action, lastAction }) => {
    switch (type) {
      case types.action:
        return action;
      case types.sync:
        return lastAction;
      default:
        return state;
    }
  };
}
export function getActionNumberReducer({ types }) {
  return (state = -1, { type, actionNumber }) => {
    switch (type) {
      case types.action:
      case types.sync:
        return actionNumber;
      default:
        return state;
    }
  };
}
export function getTargetReducer({ targetReducer, types }) {
  return (
    state = targetReducer(undefined, { type: types.initModule }),
    { type, target, action },
  ) => {
    switch (type) {
      case types.action:
        return targetReducer(state, action);
      case types.sync:
        return target;
      default:
        return state;
    }
  };
}

export default function getProxyClientReducer({ targetReducer, proxyReducer, types }) {
  return combineReducers({
    target: getTargetReducer({ targetReducer, types }),
    proxy: proxyReducer,
    lastAction: getLastActionReducer({ types }),
    actionNumber: getActionNumberReducer({ types }),
  });
}
