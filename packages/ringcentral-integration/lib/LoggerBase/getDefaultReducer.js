import { combineReducers } from 'redux';
import getModuleStatusReducer from '../getModuleStatusReducer';

export function getLoggingListReducer(types) {
  return (state = [], { type, id }) => {
    switch (type) {
      case types.log: {
        if (state.indexOf(id) > -1) {
          return state;
        }
        return [...state, id];
      }
      case types.logSuccess:
      case types.logError: {
        return state.filter(item => item !== id);
      }
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export default function getDefaultReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    loggingList: getLoggingListReducer(types),
  });
}
