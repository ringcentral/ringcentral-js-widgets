import { combineReducers } from 'redux';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';

export default function getCallLogSectionReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
  });
}
