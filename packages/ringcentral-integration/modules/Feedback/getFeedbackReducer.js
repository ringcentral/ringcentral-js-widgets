import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export default function getFeedbackReducer(actionTypes) {
  return combineReducers({
    status: getModuleStatusReducer(actionTypes),
  });
}
