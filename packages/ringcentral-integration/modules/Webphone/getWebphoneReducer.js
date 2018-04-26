import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import connectionStatus from './connectionStatus';
import { isRing, isOnHold } from './webphoneHelper';

export function getVideoElementPreparedReducer(types) {
  return (state = false, { type }) => {
    if (type === types.videoElementPrepared) return true;
    return state;
  };
}

export function getConnectionStatusReducer(types) {
  return (state = connectionStatus.disconnected, { type }) => {
    switch (type) {
      case types.connect:
      case types.reconnect:
        return connectionStatus.connecting;
      case types.registered:
        return connectionStatus.connected;
      case types.unregistered:
        return connectionStatus.disconnected;
      case types.disconnect:
        return connectionStatus.disconnecting;
      case types.connectError:
      case types.registrationFailed:
        return connectionStatus.connectFailed;
      default:
        return state;
    }
  };
}

export function getErrorCodeReducer(types) {
  return (state = null, { type, errorCode = state }) => {
    switch (type) {
      case types.connectError:
      case types.registrationFailed:
        return errorCode;
      case types.registered:
        return null;
      default:
        return state;
    }
  };
}

export function getStatusCodeReducer(types) {
  return (state = null, { type, statusCode = state }) => {
    switch (type) {
      case types.connectError:
      case types.registrationFailed:
        return statusCode;
      case types.registered:
        return null;
      default:
        return state;
    }
  };
}

export function getConnectRetryCountsReducer(types) {
  return (state = 0, { type }) => {
    switch (type) {
      case types.reconnect:
        return state + 1;
      case types.resetRetryCounts:
      case types.registered:
        return 0;
      default:
        return state;
    }
  };
}

export function getActiveSessionIdReducer(types) {
  return (state = null, { type, session = {}, sessions = [] }) => {
    let onHoldSessions;
    switch (type) {
      case types.callStart:
        return session.id;
      case types.callEnd:
        if (session.id !== state) {
          return state;
        }
        onHoldSessions =
          sessions.filter(sessionItem => isOnHold(sessionItem));
        if (onHoldSessions && onHoldSessions[0]) {
          return onHoldSessions[0].id;
        }
        return null;
      case types.disconnect:
        return null;
      default:
        return state;
    }
  };
}

export function getRingSessionIdReducer(types) {
  return (state = null, { type, session = {}, sessions = [] }) => {
    let ringSessions;
    switch (type) {
      case types.callRing:
        return session.id;
      case types.callStart:
      case types.callEnd:
        if (session.id !== state) {
          return state;
        }
        ringSessions =
          sessions.filter(sessionItem => isRing(sessionItem));
        if (ringSessions && ringSessions[0]) {
          return ringSessions[0].id;
        }
        return null;
      case types.disconnect:
        return null;
      default:
        return state;
    }
  };
}

export function getLastEndedSessionsReducer(types) {
  return (state = [], { type, session = {} }) => {
    let lastSessions;
    switch (type) {
      case types.callEnd:
        if (
          /**
          * don't add incoming call that isn't relied by current app
          *   to end sessions. this call can be answered by other apps
          */
          !session.startTime &&
          !session.isToVoicemail &&
          !session.isForwarded &&
          !session.isReplied
        ) {
          return state;
        }
        lastSessions = [session].concat(
          state.filter(sessionItem => sessionItem.id !== session.id)
        );
        return lastSessions.slice(0, 5);
      default:
        return state;
    }
  };
}

export function getSessionsReducer(types) {
  return (state = [], { type, sessions }) => {
    switch (type) {
      case types.updateSessions:
        return sessions;
      case types.destroySessions:
        return [];
      default:
        return state;
    }
  };
}

export default function getWebphoneReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    videoElementPrepared: getVideoElementPreparedReducer(types),
    connectionStatus: getConnectionStatusReducer(types),
    connectRetryCounts: getConnectRetryCountsReducer(types),
    errorCode: getErrorCodeReducer(types),
    statusCode: getStatusCodeReducer(types),
    activeSessionId: getActiveSessionIdReducer(types),
    ringSessionId: getRingSessionIdReducer(types),
    sessions: getSessionsReducer(types),
    lastEndedSessions: getLastEndedSessionsReducer(types),
  });
}
