import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export default function getDateTimeFormatReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
  });
}
