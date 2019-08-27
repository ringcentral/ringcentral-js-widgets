import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export default (types, reducers) => combineReducers({
  ...reducers,
  status: getModuleStatusReducer(types),
});
