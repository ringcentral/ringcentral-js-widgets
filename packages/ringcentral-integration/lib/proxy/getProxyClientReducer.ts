import { combineReducers } from 'redux';

import { dropStates } from './handleProxyAction';

export function getLastActionReducer({ types }) {
  return (state = null, { type, action, lastAction }) => {
    switch (type) {
      case types.action:
        return dropStates(action);
      case types.sync:
        return dropStates(lastAction);
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
        return actionNumber ?? state;
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

export default function getProxyClientReducer({
  targetReducer,
  proxyReducer,
  types,
}) {
  return combineReducers({
    target: getTargetReducer({ targetReducer, types }),
    proxy: proxyReducer,
    lastAction: getLastActionReducer({ types }),
    actionNumber: getActionNumberReducer({ types }),
  });
}
