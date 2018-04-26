import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getTimestampReducer(types) {
  return (state = null, { type, timestamp }) => {
    switch (type) {
      case types.startThrottle:
        return timestamp;
      case types.stopThrottle:
        return null;
      default:
        return state;
    }
  };
}


export default function getRateLimiterReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
  });
}
