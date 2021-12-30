import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getLastActions(types) {
  return (state = [], action) => {
    if (action.type === types.clear) {
      return [];
    }
    if (action.type && !action._state) {
      return [...state, action];
    }
    return state;
  };
}

export default function getAnalyticsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    lastActions: getLastActions(types),
  });
}
