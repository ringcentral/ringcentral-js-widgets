import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import R from 'ramda';
import { combineReducers } from 'redux';
import {
  getDndStatusReducer,
  getPresenceStatusReducer,
  getUserStatusReducer,
  getMessageReducer,
} from '../Presence/getPresenceReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import {
  normalizeFromTo,
  normalizeStartTime,
  isIntermediateCall,
} from '../../lib/callLogHelpers';

export function getDataReducer(types) {
  const removeIntermediateCall = R.reduce((result, activeCall) => {
    if (
      !isIntermediateCall(activeCall) &&
      !R.find(
        item => (
          item.sessionId === activeCall.sessionId &&
          item.direction === activeCall.direction
        ),
        result
      )
    ) {
      result.push(activeCall);
    }
    return result;
  });
  return (state = [], { type, activeCalls = [], timestamp }) => {
    switch (type) {
      case types.fetchSuccess:
      case types.notification: {
        return R.map((activeCall) => {
          const existingCall = state.find(call => (
            call.sessionId === activeCall.sessionId
          ));
          if (!existingCall) {
            const normalizedCall = normalizeStartTime(normalizeFromTo(activeCall));
            const startTime = normalizedCall.startTime || timestamp;
            const offset = Math.min(timestamp - startTime, 0);
            return {
              ...normalizedCall,
              startTime,
              offset,
            };
          }
          return {
            ...existingCall,
            ...normalizeStartTime(normalizeFromTo(activeCall)),
          };
        }, removeIntermediateCall([], activeCalls));
      }
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}


function getTelephonyStatusReducer(types) {
  return (state = null, { type, telephonyStatus = state }) => {
    switch (type) {
      case types.fetchSuccess:
      case types.notification:
        return telephonyStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

/* istanbul ignore next: unnecessary to test combineReducers */
export default function getDetailedPresenceReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    data: getDataReducer(types),
    dndStatus: getDndStatusReducer(types),
    presenceStatus: getPresenceStatusReducer(types),
    userStatus: getUserStatusReducer(types),
    message: getMessageReducer(types),
    telephonyStatus: getTelephonyStatusReducer(types),
  });
}
