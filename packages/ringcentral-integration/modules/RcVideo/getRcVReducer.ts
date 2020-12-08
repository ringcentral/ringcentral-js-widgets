import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import { RcVideoActionTypes } from './actionTypes';
import { RcvDelegator } from './interface';
import { videoStatus } from './videoStatus';

export function getRcVideoInfoReducer(types: RcVideoActionTypes) {
  return (state = {}, { type, meeting = null, patch = true }) => {
    switch (type) {
      case types.updateMeetingSettings: {
        return patch
          ? {
              ...state,
              ...meeting,
            }
          : meeting;
      }
      default:
        return state;
    }
  };
}

export function getRcVideoStatusReducer(types: RcVideoActionTypes) {
  return (state = videoStatus.idle, { type }) => {
    switch (type) {
      case types.initSettingsStart:
        return videoStatus.initializing;
      case types.initSettingsEnd:
        return videoStatus.initialized;
      case types.initCreating:
        return videoStatus.creating;
      case types.created:
        return videoStatus.created;
      case types.initUpdating:
        return videoStatus.updating;
      case types.updated:
        return videoStatus.updated;
      case types.resetCreating:
      case types.resetUpdating:
        return videoStatus.idle;
      default:
        return state;
    }
  };
}

export function getDefaultVideoSettingReducer(types: RcVideoActionTypes) {
  return (state = {}, { type, meeting = null }) => {
    switch (type) {
      case types.saveAsDefaultSetting:
        return { ...state, ...meeting };
      default:
        return state;
    }
  };
}

export function getPersonalMeetingReducer(types: RcVideoActionTypes) {
  return (state = null, { type, meeting = null }) => {
    switch (type) {
      case types.savePersonalMeeting:
        return { ...state, ...meeting };
      case types.resetPersonalMeeting:
        return {};
      default:
        return state;
    }
  };
}
export function getRcVideoSettingLocksReducer(types: RcVideoActionTypes) {
  return (state = {}, { type, settingLocks }) => {
    switch (type) {
      case types.updateMeetingSettingLocks:
        return settingLocks;
      default:
        return state;
    }
  };
}

export function getRcVideoPreferencesReducer(types: RcVideoActionTypes) {
  return (state = {}, { type, preferences }) => {
    switch (type) {
      case types.updateMeetingPreferences:
        return preferences;
      default:
        return state;
    }
  };
}

export function getRcVideoPreferencesStateReducer(types: RcVideoActionTypes) {
  return (state = false, { type, isPreferencesChanged }): boolean => {
    switch (type) {
      case types.saveMeetingPreferencesState:
        return isPreferencesChanged;
      default:
        return state;
    }
  };
}

export function getDelegatorListReducer(types: RcVideoActionTypes) {
  return (state = [], { type, delegators }): RcvDelegator[] => {
    switch (type) {
      case types.updateDelegatorList:
        return delegators;
      default:
        return state;
    }
  };
}

export function getDelegatorReducer(types: RcVideoActionTypes) {
  return (state = null, { type, delegator }): RcvDelegator => {
    switch (type) {
      case types.updateDelegator:
        return delegator;
      default:
        return state;
    }
  };
}

export default (types: RcVideoActionTypes, reducers) =>
  combineReducers({
    ...reducers,
    meeting: getRcVideoInfoReducer(types),
    status: getModuleStatusReducer(types),
    videoStatus: getRcVideoStatusReducer(types),
    delegators: getDelegatorListReducer(types),
    preferences: getRcVideoPreferencesReducer(types),
    isPreferencesChanged: getRcVideoPreferencesStateReducer(types),
    settingLocks: getRcVideoSettingLocksReducer(types),
    delegator: getDelegatorReducer(types),
  });
