import { combineReducers } from 'redux';
import getModuleStatusReducer from '@ringcentral-integration/commons/lib/getModuleStatusReducer';

export default function getReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
  });
}
