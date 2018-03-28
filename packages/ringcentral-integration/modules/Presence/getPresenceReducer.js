import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import dndStatuses from './dndStatus';

export function getDndStatusReducer(types) {
  return (state = null, { type, dndStatus = state }) => {
    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.updateError:
      case types.update:
        return dndStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getLastNotDisturbDndStatusReducer(types) {
  return (state = null, { type, dndStatus, lastDndStatus = state }) => {
    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.update:
        if (
          lastDndStatus !== dndStatuses.doNotAcceptAnyCalls &&
          lastDndStatus !== dndStatus
        ) {
          return lastDndStatus;
        }
        return state;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getPresenceStatusReducer(types) {
  return (state = null, { type, presenceStatus = state }) => {
    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
        return presenceStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getUserStatusReducer(types) {
  return (state = null, { type, userStatus = state }) => {
    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.update:
      case types.updateError:
        return userStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getMessageReducer(types) {
  return (state = null, { type, message = state }) => {
    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
        return message;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export default function getPresenceReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    dndStatus: getDndStatusReducer(types),
    presenceStatus: getPresenceStatusReducer(types),
    userStatus: getUserStatusReducer(types),
    message: getMessageReducer(types),
  });
}
