import { combineReducers } from 'redux';
import r from 'ramda';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

function getEndedCallsReducer(types) {
  return (state = [], { type, endedCalls, timestamp }) => {
    switch (type) {
      case types.addEndedCalls: {
        const newState = state.slice();
        r.forEach((call) => {
          const callWithDuration = {
            ...call,
            duration: Math.floor((timestamp - call.startTime) / 1000),
          };
          const idx = r.findIndex(item => item.sessionId === call.sessionId, newState);
          if (idx > -1) {
            // replace old one if found
            newState[idx] = callWithDuration;
          } else {
            newState.push(callWithDuration);
          }
        }, endedCalls);
        return newState;
      }
      case types.removeEndedCalls:
        return state.filter(call => (
          !endedCalls.find(shouldRemove => shouldRemove.sessionId === call.sessionId)
        ));
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}


/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
export default function getCallHistoryReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    endedCalls: getEndedCallsReducer(types),
  });
}
