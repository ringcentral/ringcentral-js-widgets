import { assoc } from 'ramda';
import { combineReducers } from 'redux';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';
import {
  getCurrentIdentifyReducer,
  getCurrentNotificationIdentifyReducer,
  getNotificationIsExpandReducer,
} from './getStorageReducer';

function getCallsSavingStatusReducer(types) {
  return (state = {}, { type, identify }) => {
    switch (type) {
      case types.saving:
        return assoc(identify, true, state);
      case types.saveSuccess:
      case types.saveError:
        return assoc(identify, false, state);
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

export default function getCallLogSectionReducer(
  types,
  notSyncOpenState = false,
) {
  const baseReducers = {
    status: getModuleStatusReducer(types),
    callsSavingStatus: getCallsSavingStatusReducer(types),
  };
  const openStateReducer = {
    currentIdentify: getCurrentIdentifyReducer(types),
    currentNotificationIdentify: getCurrentNotificationIdentifyReducer(types),
    notificationIsExpand: getNotificationIsExpandReducer(types),
  };
  const reducers = {
    ...baseReducers,
    ...(notSyncOpenState ? openStateReducer : {}),
  };
  return combineReducers(reducers);
}
