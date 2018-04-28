import { combineReducers } from 'redux';
import r from 'ramda';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

const DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000; // 1day

export function getEndedCallsReducer(types) {
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
          !endedCalls.find(shouldRemove => shouldRemove.sessionId === call.sessionId) || (
            // clean current overdue ended call (default clean time: 1day).
            (new Date()).getTime() - call.startTime > DEFAULT_CLEAN_TIME
          )
        ));
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}


/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
export default function getCallHistoryReducer(types, reducers) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
  });
}
