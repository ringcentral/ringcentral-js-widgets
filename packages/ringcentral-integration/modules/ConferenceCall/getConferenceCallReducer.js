import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import conferenceCallStatus from './conferenceCallStatus';

export function getConferenceCallStatusReducer(types) {
  return (state = conferenceCallStatus.idle, {
    type
  }) => {
    switch (type) {
      case types.makeConference:
      case types.terminateConference:
      case types.updateConference:
      case types.bringInConference:
      case types.removeFromConference:
      case types.getParty:
        return conferenceCallStatus.requesting;

      case types.makeConferenceSucceeded:
      case types.makeConferenceFailed:
      case types.terminateConferenceSucceeded:
      case types.terminateConferenceFailed:
      case types.updateConferenceSucceeded:
      case types.updateConferenceFailed:
      case types.bringInConferenceSucceeded:
      case types.bringInConferenceFailed:
      case types.removeFromConferenceSucceeded:
      case types.removeFromConferenceFailed:
      case types.getPartySucceeded:
      case types.getPartyFailed:
      case types.resetSuccess:
        return conferenceCallStatus.idle;

      default:
        return state;
    }
  };
}


export function getMakeConferenceCallReducer(types) {
  return (state = {}, {
    type,
    conference, // platform conference session data
    sessionId, // session id of the conference
    partyProfile,
  }) => {
    const res = {
      ...state
    };
    switch (type) {
      case types.resetSuccess:
        return {};
      case types.makeConferenceSucceeded:
      case types.updateConferenceSucceeded:
        res[conference.id] = {
          conference,
          sessionId,
          profiles: (res[conference.id] && res[conference.id].profiles) || []
        };
        return res;
      case types.bringInConferenceSucceeded:
        res[conference.id] = {
          conference,
          sessionId,
          profiles: [...res[conference.id].profiles, partyProfile]
        };
        return res;
      case types.terminateConferenceSucceeded:
        delete res[conference.id];
        return res;
      default:
        return state;
    }
  };
}

export function getMergingStatusReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.mergeStart:
        return true;
      case types.mergeSucceeded:
      case types.mergeFailed:
      case types.resetSuccess:
        return false;
      default:
        return state;
    }
  };
}

export function getMergingPairReducer(types) {
  return (state = {}, { type, fromSessionId, toSessionId }) => {
    switch (type) {
      case types.updateFromSession:
        return { fromSessionId };
      case types.updateToSession:
        return { ...state, toSessionId };
      case types.mergeSucceeded:
      case types.resetSuccess:
        return {};
      // restore the pair when failure
      default:
        return state;
    }
  };
}

export function getCurrentConferenceIdReducer(types) {
  return (state = null, { type, conferenceId }) => {
    switch (type) {
      case types.updateCurrentConferenceId:
        return conferenceId;
      case types.initSuccess:
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export default function getConferenceCallReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    conferences: getMakeConferenceCallReducer(types),
    conferenceCallStatus: getConferenceCallStatusReducer(types),
    isMerging: getMergingStatusReducer(types),
    mergingPair: getMergingPairReducer(types),
    currentConferenceId: getCurrentConferenceIdReducer(types),
  });
}
