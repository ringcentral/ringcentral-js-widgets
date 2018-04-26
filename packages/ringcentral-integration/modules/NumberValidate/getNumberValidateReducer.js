import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export default function getNumberValidateReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
  });
}
