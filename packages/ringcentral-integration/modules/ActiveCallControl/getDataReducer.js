import { combineReducers } from 'redux';

function getActiveSessionIdReducer(types) {
  return (state = null, { type, telephonySessionId }) => {
    switch (type) {
      case types.setActiveSessionId: {
        return telephonySessionId;
      }
      case types.resetSuccess:
      case types.rejectSuccess:
      case types.hangUpSuccess:
      case types.removeActiveSession: {
        return null;
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

function getBusyReducer(types) {
  return (state = 0, { type, timestamp }) => {
    switch (type) {
      case types.hold:
      case types.unhold:
      case types.mute:
      case types.unmute:
      case types.transfer:
      case types.reject:
      case types.hangUp:
      case types.flip:
        return timestamp;
      case types.holdSuccess:
      case types.holdError:
      case types.unholdSuccess:
      case types.unholdError:
      case types.muteSuccess:
      case types.muteError:
      case types.unmuteSuccess:
      case types.unmuteError:
      case types.transferSuccess:
      case types.transferError:
      case types.rejectSuccess:
      case types.rejectError:
      case types.hangUpSuccess:
      case types.hangUpError:
      case types.flipSuccess:
      case types.flipError:
        return 0;
      default:
        return state;
    }
  };
}

function getSessionsReducer(types) {
  return (state = [], { type, sessionData }) => {
    switch (type) {
      case types.updateActiveSessions:
        return sessionData;
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export default function getDataReducer(types) {
  return combineReducers({
    activeSessionId: getActiveSessionIdReducer(types),
    busy: getBusyReducer(types),
    timestamp: getTimestampReducer(types),
    sessions: getSessionsReducer(types),
  });
}
