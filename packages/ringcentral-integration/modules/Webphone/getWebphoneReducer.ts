import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import connectionStatus from './connectionStatus';
import sessionStatus from './sessionStatus';
import { isRing, sortByLastActiveTimeDesc } from './webphoneHelper';

export const DEFAULT_AUDIO = 'default';

export function getVideoElementPreparedReducer(types) {
  return (state = false, { type }) => {
    if (type === types.videoElementPrepared) return true;
    return state;
  };
}

export function getConnectionStatusReducer(types) {
  return (state = connectionStatus.disconnected, { type }) => {
    switch (type) {
      case types.connect: // trigger by first 3 connect from disconnected or connectFailed status
        return connectionStatus.connecting;
      case types.reconnect: // trigger by connect from connectError status
        return connectionStatus.reconnecting;
      case types.registered: // trigger when register success
        return connectionStatus.connected;
      case types.connectFailed: // trigger when connect failed (retry time <=2)
        return connectionStatus.connectFailed;
      case types.connectError: // trigger when connect failed (retry time > 2)
        return connectionStatus.connectError;
      case types.unregistered: // trigger by user disconnect success
        return connectionStatus.disconnected;
      case types.disconnectOnInactive:
        return connectionStatus.inactiveDisconnecting;
      case types.unregisteredOnInactive:
        return connectionStatus.inactive;
      case types.disconnect: // trigger by user disconnect
        return connectionStatus.disconnecting;
      default:
        return state;
    }
  };
}

export function getWebphoneDeviceReducer(types) {
  return (state = null, { type, device }) => {
    switch (type) {
      case types.reconnect:
      case types.connect:
      case types.connectFailed:
      case types.connectError:
      case types.unregistered:
      case types.disconnectOnInactive:
      case types.unregisteredOnInactive:
      case types.disconnect:
        return null;
      case types.registered: // trigger when register success
        return device;
      default:
        return state;
    }
  };
}

export function getErrorCodeReducer(types) {
  return (state = null, { type, errorCode = state }) => {
    switch (type) {
      case types.connectError:
      case types.connectFailed:
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
      case types.connectFailed:
        return statusCode;
      case types.registered:
        return null;
      default:
        return state;
    }
  };
}

export function getConnectRetryCountsReducer(types) {
  return (state = 0, { type, retryCounts }) => {
    switch (type) {
      case types.connect:
      case types.reconnect:
        return state + 1;
      case types.unregistered:
      case types.registered:
      case types.unregisteredOnInactive:
        return 0;
      case types.setRetryCounts:
        return retryCounts;
      default:
        return state;
    }
  };
}

export function getActiveSessionIdReducer(types) {
  return (state = null, { type, session = {}, sessions = [] }) => {
    switch (type) {
      case types.callInit:
      case types.callStart:
      case types.callResume:
        return session.id;
      case types.callEnd: {
        if (session.id !== state) {
          return state;
        }
        const activeSessions = sessions.filter((x) => !isRing(x));
        activeSessions.sort(sortByLastActiveTimeDesc);
        return (activeSessions[0] && activeSessions[0].id) || null;
      }
      case types.clearSessionCaching: {
        const activeSessions = sessions.filter((x) => !x.cached && !isRing(x));
        activeSessions.sort(sortByLastActiveTimeDesc);
        return (activeSessions[0] && activeSessions[0].id) || null;
      }
      case types.disconnect:
        return null;
      default:
        return state;
    }
  };
}

export function getRingSessionIdReducer(types) {
  return (state = null, { type, session = {}, sessions = [] }) => {
    switch (type) {
      case types.callRing:
        return session.id;
      case types.callStart:
      case types.callEnd: {
        if (session.id !== state) {
          return state;
        }
        const ringSessions = sessions.filter((x) => isRing(x));
        return (ringSessions[0] && ringSessions[0].id) || null;
      }
      case types.disconnect:
        return null;
      default:
        return state;
    }
  };
}

export function getLastEndedSessionsReducer(types) {
  return (state = [], { type, session = {} }) => {
    switch (type) {
      case types.callEnd: {
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
        const lastSessions = [session].concat(
          state.filter((x) => x.id !== session.id),
        );
        return lastSessions.slice(0, 5);
      }
      default:
        return state;
    }
  };
}

export function getSessionsReducer(types) {
  return (state = [], { type, sessions, cachingSessionIds }) => {
    switch (type) {
      case types.updateSessions: {
        const cachedSessions = state.filter((x) => x.cached);
        cachedSessions.forEach((cachedSession) => {
          const session = sessions.find((x) => x.id === cachedSession.id);
          if (session) {
            session.cached = true;
          } else {
            cachedSession.removed = true;
            sessions.push(cachedSession);
          }
        });
        return sessions.sort(sortByLastActiveTimeDesc);
      }
      case types.setSessionCaching: {
        let needUpdate = false;
        cachingSessionIds.forEach((sessionId) => {
          const session = state.find((x) => x.id === sessionId);
          if (session) {
            session.cached = true;
            needUpdate = true;
          }
        });
        return needUpdate ? [...state] : state;
      }
      case types.clearSessionCaching: {
        let needUpdate = false;
        state.forEach((session) => {
          if (session.cached) {
            session.cached = false;
            needUpdate = true;
          }
        });
        if (needUpdate) {
          return state.filter((x) => !x.removed);
        }
        return state;
      }
      case types.onholdCachedSession: {
        let needUpdate = false;
        state.forEach((session) => {
          if (session.cached) {
            session.callStatus = sessionStatus.onHold;
            session.isOnHold = true;
            needUpdate = true;
          }
        });
        return needUpdate ? [...state] : state;
      }
      case types.destroySessions:
        return [];
      default:
        return state;
    }
  };
}

export function getIncomingAudioFileReducer(types) {
  return (state = DEFAULT_AUDIO, { type, incomingAudioFile, fileName }) => {
    switch (type) {
      case types.setRingtone:
        return incomingAudioFile;
      case types.setIncomingAudio:
        return fileName;
      case types.resetIncomingAudio:
        return DEFAULT_AUDIO;
      default:
        return state;
    }
  };
}

export function getIncomingAudioDataUrlReducer(types) {
  return (state = null, { type, incomingAudio = null, dataUrl = null }) => {
    switch (type) {
      case types.setRingtone:
        return incomingAudio;
      case types.setIncomingAudio:
        return dataUrl;
      case types.resetIncomingAudio:
        return null;
      default:
        return state;
    }
  };
}

export function getOutgoingAudioFileReducer(types) {
  return (state = DEFAULT_AUDIO, { type, outgoingAudioFile, fileName }) => {
    switch (type) {
      case types.setRingtone:
        return outgoingAudioFile;
      case types.setOutgoingAudio:
        return fileName;
      case types.resetOutgoingAudio:
        return DEFAULT_AUDIO;
      default:
        return state;
    }
  };
}

export function getOutgoingAudioDataUrlReducer(types) {
  return (state = null, { type, outgoingAudio, dataUrl = null }) => {
    switch (type) {
      case types.setRingtone:
        return outgoingAudio;
      case types.setOutgoingAudio:
        return dataUrl;
      case types.resetOutgoingAudio:
        return null;
      default:
        return state;
    }
  };
}

export function getWebphoneStorageReducer(types) {
  return combineReducers({
    incomingAudioFile: getIncomingAudioFileReducer(types),
    incomingAudioDataUrl: getIncomingAudioDataUrlReducer(types),
    outgoingAudioFile: getOutgoingAudioFileReducer(types),
    outgoingAudioDataUrl: getOutgoingAudioDataUrlReducer(types),
  });
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
    device: getWebphoneDeviceReducer(types),
  });
}
