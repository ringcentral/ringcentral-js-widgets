import { assoc } from 'ramda';
import { combineReducers } from 'redux';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';

function getCallsSavingStatusReducer(types) {
  return (state = {}, { type, identify }) => {
    switch (type) {
      case types.saving:
        return assoc(identify, true, state);
      case types.saveSuccess: case types.saveError:
        return assoc(identify, false, state);
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
