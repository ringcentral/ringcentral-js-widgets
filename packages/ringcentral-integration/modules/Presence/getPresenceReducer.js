import { combineReducers } from 'redux';
import { find, reduce, map } from 'ramda';
import dndStatuses from './dndStatus';
import {
  normalizeFromTo,
  normalizeStartTime,
  isIntermediateCall,
} from '../../lib/callLogHelpers';

export function getDndStatusReducer(types) {
  return (state = null, { type, data: { dndStatus = state } = {} }) => {
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

export function getMeetingStatusReducer(types) {
  return (state = null, { type, data: { meetingStatus = state } = {} }) => {
    switch (type) {
      case types.notification:
      case types.fetchSuccess:
      case types.updateSuccess:
      case types.updateError:
      case types.update:
        return meetingStatus;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getLastNotDisturbDndStatusReducer(types) {
  return (
    state = null,
    { type, data: { dndStatus } = {}, lastDndStatus = state },
  ) => {
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
  return (state = null, { type, data: { presenceStatus = state } = {} }) => {
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
  return (state = null, { type, data: { userStatus = state } = {} }) => {
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

export const removeIntermediateCall = reduce((result, activeCall) => {
  if (
    !isIntermediateCall(activeCall) &&
    !find(
      (item) =>
        item.sessionId === activeCall.sessionId &&
        item.direction === activeCall.direction,
      result,
    )
  ) {
    result.push(activeCall);
  }
  return result;
});

export function getActiveCallsReducer(types) {
  return (
    state = [],
    { type, timestamp, data: { activeCalls = [], totalActiveCalls = 0 } = {} },
  ) => {
    switch (type) {
      case types.fetchSuccess:
      case types.notification: {
        if (activeCalls.length < totalActiveCalls) {
          return state;
        }
        return map((activeCall) => {
          const existingCall = state.find(
            (call) => call.sessionId === activeCall.sessionId,
          );
          if (!existingCall) {
            const normalizedCall = normalizeStartTime(
              normalizeFromTo(activeCall),
            );
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
  return (state = null, { type, data: { telephonyStatus = state } = {} }) => {
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

export function getSequenceReducer(types) {
  return (state = 0, { type, data: { sequence = state } = {} }) => {
    switch (type) {
      case types.notification:
        return sequence;
      case types.resetSuccess:
        return 0;
      default:
        return state;
    }
  };
}

export function getDataReducer(types) {
  return combineReducers({
    dndStatus: getDndStatusReducer(types),
    presenceStatus: getPresenceStatusReducer(types),
    userStatus: getUserStatusReducer(types),
    telephonyStatus: getTelephonyStatusReducer(types),
    meetingStatus: getMeetingStatusReducer(types),
    activeCalls: getActiveCallsReducer(types),
    lastDndStatus: getLastNotDisturbDndStatusReducer(types),
    sequence: getSequenceReducer(types),
  });
}
