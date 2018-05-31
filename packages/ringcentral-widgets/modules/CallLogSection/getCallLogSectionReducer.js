import { combineReducers } from 'redux';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';

function getCallsSavingStatusReducer(types) {
  return (state = {}, { type, identify }) => {
    switch (type) {
      case types.update:
      case types.saving:
        return {
          ...state,
          [identify]: true,
        };
      case types.saveSuccess:
      case types.saveError:
        return {
          ...state,
          [identify]: false,
        };
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

export default function getCallLogSectionReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    callsSavingStatus: getCallsSavingStatusReducer(types),
  });
}
