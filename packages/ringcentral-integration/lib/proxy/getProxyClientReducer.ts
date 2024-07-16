import { combineReducers } from 'redux';

import { dropStates } from './handleProxyAction';

export function getLastActionReducer({ types }: any) {
  return (state = null, { type, action, lastAction }: any) => {
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
export function getActionNumberReducer({ types }: any) {
  return (state = -1, { type, actionNumber }: any) => {
    switch (type) {
      case types.action:
      case types.sync:
        return actionNumber ?? state;
      default:
        return state;
    }
  };
}
export function getTargetReducer({ targetReducer, types }: any) {
  return (
    state = targetReducer(undefined, { type: types.initModule }),
    { type, target, action }: any,
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
}: any) {
  return combineReducers({
    target: getTargetReducer({ targetReducer, types }),
    proxy: proxyReducer,
    lastAction: getLastActionReducer({ types }),
    actionNumber: getActionNumberReducer({ types }),
  });
}
