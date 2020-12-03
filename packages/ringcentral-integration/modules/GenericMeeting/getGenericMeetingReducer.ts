import { combineReducers } from 'redux';
import { genericMeetingStatus } from './genericMeetingStatus';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getMeetingUpdatingStatusReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.initUpdating:
        return genericMeetingStatus.updating;
      case types.updated:
        return genericMeetingStatus.updated;
      case types.resetUpdating:
        return genericMeetingStatus.idle;
      default:
        return state;
    }
  };
}

const getGenericMeetingReducer = (types, reducers) =>
  combineReducers({
    ...reducers,
    updatingStatus: getMeetingUpdatingStatusReducer(types),
    status: getModuleStatusReducer(types),
  });

export default getGenericMeetingReducer;
