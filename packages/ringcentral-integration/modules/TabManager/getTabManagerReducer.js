import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getEventReducer(types) {
  return (state = null, { type, event, args }) => {
    if (type === types.event) {
      return {
        name: event,
        args,
      };
    }
    return null;
  };
}
export function getActiveReducer(types) {
  return (state = false, { type, active }) => {
    switch (type) {
      case types.initSuccess:
      case types.mainTabIdChanged:
        return active;
      default:
        return state;
    }
  };
}

export default function getTabManagerReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    active: getActiveReducer(types),
    event: getEventReducer(types),
  });
}
