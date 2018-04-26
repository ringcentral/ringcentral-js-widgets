import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';


export function getLastAction(types) {
  return (state = [], action) => {
    if (action.type === types.clear) {
      return [];
    }
    return [...state, action];
  };
}

export default function getAnalyticsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    lastAction: getLastAction(types),
  });
}
