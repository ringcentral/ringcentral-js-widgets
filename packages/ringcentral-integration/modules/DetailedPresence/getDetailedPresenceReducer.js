import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import { find, reduce, map } from 'ramda';
import getPresenceReducer from '../Presence/getPresenceReducer';
import {
  normalizeFromTo,
  normalizeStartTime,
  isIntermediateCall,
} from '../../lib/callLogHelpers';

export function getDataReducer(types) {
  const removeIntermediateCall = reduce((result, activeCall) => {
    if (
      !isIntermediateCall(activeCall) &&
      !find(
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
      case types.updateActiveCalls: {
        return map((activeCall) => {
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

export function getTelephonyStatusReducer(types) {
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

export default function getDetailedPresenceReducer(types, reducers = {}) {
  return getPresenceReducer(types, {
    ...reducers,
    data: getDataReducer(types),
    telephonyStatus: getTelephonyStatusReducer(types),
  });
}
