import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';


export function getCallMatchedReducer(types) {
  return (state = {}, { type, sessionId, toEntityId }) => {
    if (type === types.setData) {
      return {
        ...state,
        [sessionId]: toEntityId,
      };
    }
    return state;
  };
}
/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
export default function getCallMonitorReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
  });
}
