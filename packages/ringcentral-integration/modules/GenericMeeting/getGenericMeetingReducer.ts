import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

const getGenericMeetingReducer = (types, reducers) =>
  combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
  });
export default getGenericMeetingReducer;
