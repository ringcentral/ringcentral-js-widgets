import { combineReducers } from 'redux';
import getModuleStatusReducer from '../getModuleStatusReducer';

export default function getDefaultReducer(actionTypes, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(actionTypes),
  });
}
