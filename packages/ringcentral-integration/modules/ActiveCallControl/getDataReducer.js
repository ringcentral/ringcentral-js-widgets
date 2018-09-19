import { combineReducers } from 'redux';
import { isHangUp, isReject } from './helpers';
import activeCallControlStatus from '../../enums/activeCallControlStatus';


function updateActiveSessionStatus({
  state,
  party,
  sessionId
}) {
  const newState = { ...state };
  const {
    muted,
    standAlone,
    status: {
      code
    },
    direction,
  } = party;
  if (isHangUp(code) && newState[sessionId]) {
    delete newState[sessionId];
  } else {
    newState[sessionId] = {
      ...newState[sessionId],
      standAlone,
      sessionId,
      isOnMute: muted,
      isOnHold: code === activeCallControlStatus.hold,
      isReject: isReject({ direction, code })
    };
  }
  return newState;
}

function setActiveSessionStatus(state, sessionId, obj) {
  const newState = { ...state };
  newState[sessionId] = {
    ...newState[sessionId],
    isOnProceed: false,
    ...obj
  };
  return newState;
}
function getActiveSessionIdReducer(types) {
  return (state = null, { type, sessionId }) => {
    switch (type) {
      case types.setActiveSessionId: {
        return sessionId;
      }
      case types.resetSuccess:
      case types.removeActiveSession: {
        return null;
      }
      default:
        return state;
    }
  };
}
function getRecordingIdsStatusReducer(types) {
  return (state = {}, { type, sessionId, response }) => {
    switch (type) {
      case types.startRecord: {
        const newState = { ...state };
        newState[sessionId] = {
          ...response
        };
        return newState;
      }
      case types.recordFail:
      case types.removeActiveSession:
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}
function getActiveSessionsStatusReducer(types) {
  return (state = {}, {
    type, sessionId, party, activeSessionsMap
  }) => {
    switch (type) {
      case types.updateActiveSessions: {
        let newState = null;
        for (const sessionId in activeSessionsMap) {
          if (sessionId) {
            newState = updateActiveSessionStatus({
              state,
              party: activeSessionsMap[sessionId],
              sessionId
            });
          }
        }
        return newState;
      }
      case types.updateActiveSessionStatus: {
        return updateActiveSessionStatus({
          state,
          party,
          sessionId
        });
      }
      case types.proceeding: {
        return setActiveSessionStatus(state, sessionId, { isOnProceed: true });
      }
      case types.startRecord:
      case types.stopRecord: {
        return setActiveSessionStatus(state, sessionId, { isOnRecording: type === types.startRecord });
      }
      case types.mute:
      case types.unmute: {
        return setActiveSessionStatus(state, sessionId, { isOnMute: type === types.mute });
      }
      case types.hold:
      case types.unhold: {
        return setActiveSessionStatus(state, sessionId, { isOnHold: type === types.hold });
      }
      case types.removeActiveSession: {
        const newState = { ...state };
        if (newState[sessionId]) {
          delete newState[sessionId];
        }
        return newState;
      }
      case types.resetSuccess: {
        return {};
      }
      default:
        return state;
    }
  };
}
function getTimestampReducer(types) {
  return (state = null, { type, timestamp }) => {
    switch (type) {
      case types.updateActiveSessions:
        return timestamp;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}
export default function getDataReducer(types) {
  return combineReducers({
    activeSessionId: getActiveSessionIdReducer(types),
    activeSessionsStatus: getActiveSessionsStatusReducer(types),
    recordingIds: getRecordingIdsStatusReducer(types),
    timestamp: getTimestampReducer(types),
  });
}
