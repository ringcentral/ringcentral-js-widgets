import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export default function getActiveCallControlReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
  });
}
