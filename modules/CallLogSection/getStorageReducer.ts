import { combineReducers } from 'redux';

function getCallsMappingReducer(types) {
  return (state = {}, { type, identify }) => {
    const originalState = state[identify];
    switch (type) {
      case types.update:
        return {
          ...state,
          [identify]: {
            ...originalState,
            latestUpdateTime: Date.now(),
            isEdited: true,
          },
        };
      case types.saving:
      case types.syncing:
        return {
          ...state,
          [identify]: {
            ...originalState,
            latestSaveTime: Date.now(),
          },
        };
      case types.saveSuccess:
        return {
          ...state,
          [identify]: {
            ...originalState,
            isSucceed: true,
            isEdited: !!(
              originalState?.latestUpdateTime &&
              originalState?.latestSaveTime &&
              originalState?.latestSaveTime < originalState?.latestUpdateTime
            ),
          },
        };
      case types.saveError:
        return {
          ...state,
          [identify]: {
            ...originalState,
            isEdited: true,
            isSucceed: false,
          },
        };
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getCallsListReducer(types) {
  return (state = [], { type, identify }) => {
    switch (type) {
      case types.update:
      case types.saving:
      case types.saveSuccess:
      case types.saveError:
        return Array.from(new Set([...state, identify]));
      case types.cleanUp:
        return [];
      default:
        return state;
    }
  };
}

export function getCurrentIdentifyReducer(types) {
  return (state = null, { type, identify }) => {
    switch (type) {
      case types.showLogSection:
        return identify;
      case types.closeLogSection:
        return null;
      default:
        return state;
    }
  };
}

export function getCurrentNotificationIdentifyReducer(types) {
  return (state = null, { type, identify }) => {
    switch (type) {
      case types.showLogNotification:
        return identify;
      case types.closeLogNotification:
        return null;
      default:
        return state;
    }
  };
}

export function getNotificationIsExpandReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.expandNotification:
        return true;
      case types.shrinkNotification:
      case types.closeLogNotification:
        return false;
      default:
        return state;
    }
  };
}

export default function getStorageReducer(types, notSyncOpenState = false) {
  const baseReducer = {
    callsList: getCallsListReducer(types),
    callsMapping: getCallsMappingReducer(types),
  };
  const openStateReducer = {
    currentIdentify: getCurrentIdentifyReducer(types),
    currentNotificationIdentify: getCurrentNotificationIdentifyReducer(types),
    notificationIsExpand: getNotificationIsExpandReducer(types),
  };
  const reducers = {
    ...baseReducer,
    ...(notSyncOpenState ? {} : openStateReducer),
  };
  return combineReducers(reducers);
}
