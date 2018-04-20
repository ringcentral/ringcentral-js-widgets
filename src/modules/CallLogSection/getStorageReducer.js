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
            isSaving: true
          },
        };
      case types.saveSuccess:
        return {
          ...state,
          [identify]: {
            ...state[identify],
            isEdited: false,
            isSaving: false,
          },
        };
      case types.saveError:
        return {
          ...state,
          [identify]: {
            ...state[identify],
            isEdited: true,
            isSaving: false,
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
      case types.hideLogSection:
        return null;
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
  });
}
