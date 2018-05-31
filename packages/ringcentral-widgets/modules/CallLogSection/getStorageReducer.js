import { combineReducers } from 'redux';

function getCallsMappingReducer(types) {
  return (state = {}, { type, identify }) => {
    switch (type) {
      case types.update:
        return {
          ...state,
          [identify]: {
            ...state[identify],
            isEdited: true,
          },
        };
      case types.saving:
        return {
          ...state,
          [identify]: {
            ...state[identify],
          },
        };
      case types.saveSuccess:
        return {
          ...state,
          [identify]: {
            ...state[identify],
            isEdited: false,
          },
        };
      case types.saveError:
        return {
          ...state,
          [identify]: {
            ...state[identify],
            isEdited: true,
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
        return Array.from(new Set([
          ...state,
          identify
        ]));
      case types.cleanUp:
        return [];
      default:
        return state;
    }
  };
}

function getCurrentIdentifyReducer(types) {
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

function getCurrentNotificationIdentifyReducer(types) {
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

function getNotificationIsExpandReducer(types) {
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

export default function getStorageReducer(types) {
  return combineReducers({
    callsList: getCallsListReducer(types),
    callsMapping: getCallsMappingReducer(types),
    currentIdentify: getCurrentIdentifyReducer(types),
    currentNotificationIdentify: getCurrentNotificationIdentifyReducer(types),
    notificationIsExpand: getNotificationIsExpandReducer(types),
  });
}
