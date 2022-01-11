import { filter } from 'ramda';
import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import { MeetingActionTypes } from './actionTypes';
import scheduleStatus from './scheduleStatus';

export function getMeetingInfoReducer(types) {
  return (state = null, { type, meeting = null }) => {
    switch (type) {
      case types.updateMeeting:
        return meeting;
      case types.clearMeeting:
        return null;
      default:
        return state;
    }
  };
}

export function getMeetingSchedulingStatusReducer(types: MeetingActionTypes) {
  return (state = scheduleStatus.idle, { type }) => {
    switch (type) {
      case types.initScheduling:
        return scheduleStatus.scheduling;
      case types.scheduled:
        return scheduleStatus.scheduled;
      case types.resetScheduling:
        return scheduleStatus.idle;
      default:
        return state;
    }
  };
}

export function getMeetingUpdatingStatusReducer(types: MeetingActionTypes) {
  return (state = [], { type, meetingId }) => {
    switch (type) {
      case types.initUpdating:
        return [
          ...state,
          {
            // using object type for further recording
            meetingId,
          },
        ];
      case types.updated:
      case types.resetUpdating:
        return filter((obj) => obj.meetingId !== meetingId, state);
      default:
        return state;
    }
  };
}

export function getMeetingStorageReducer(types: MeetingActionTypes) {
  return (state = {}, { type, meeting = null }) => {
    switch (type) {
      case types.scheduled:
        return meeting
          ? {
              startHostVideo: meeting.startHostVideo,
              startParticipantsVideo: meeting.startParticipantsVideo,
              allowJoinBeforeHost: meeting.allowJoinBeforeHost,
              audioOptions: meeting.audioOptions,
              _saved: meeting._saved,
            }
          : {};
      default:
        return state;
    }
  };
}

export function getDefaultMeetingSettingReducer(types: MeetingActionTypes) {
  return (state = {}, { type, meeting = null }) => {
    switch (type) {
      case types.saveAsDefaultSetting: {
        return meeting
          ? {
              startHostVideo: !!meeting.startHostVideo,
              startParticipantsVideo: !!meeting.startParticipantsVideo,
              allowJoinBeforeHost: !!meeting.allowJoinBeforeHost,
              audioOptions: meeting.audioOptions,
              _saved: !!meeting._saved,
              password: meeting.password,
              _requireMeetingPassword: !!meeting._requireMeetingPassword,
            }
          : {};
      }
      default:
        return state;
    }
  };
}

export function getMeetingPreferencesReducer(types: MeetingActionTypes) {
  return (state = {}, { type, preferences }) => {
    switch (type) {
      case types.updateMeetingPreferences:
        return preferences;
      default:
        return state;
    }
  };
}

export function getMeetingPreferencesStateReducer(types: MeetingActionTypes) {
  return (state = false, { type, isPreferencesChanged }): boolean => {
    switch (type) {
      case types.saveMeetingPreferencesState:
        return isPreferencesChanged;
      default:
        return state;
    }
  };
}

export function getUserSettingsReducer(types: MeetingActionTypes) {
  return (state = {}, { type, userSettings }) => {
    switch (type) {
      case types.updateUserSettings:
        return userSettings;
      default:
        return state;
    }
  };
}

export function getLockedSettingsReducer(types: MeetingActionTypes) {
  return (state = {}, { type, lockedSettings }) => {
    switch (type) {
      case types.updateLockedSettings:
        return lockedSettings;
      default:
        return state;
    }
  };
}

export function getPersonalMeetingReducer(types: MeetingActionTypes) {
  return (state = null, { type, meeting = null }) => {
    switch (type) {
      case types.updatePersonalMeeting:
        return meeting;
      case types.resetPersonalMeeting:
        return {};
      default:
        return state;
    }
  };
}

export function getDelegatorsReducer(types: MeetingActionTypes) {
  return (state = [], { type, delegators = [] }) => {
    switch (type) {
      case types.updateDelegatorList:
        return delegators;
      default:
        return state;
    }
  };
}

export default (types: MeetingActionTypes, reducers) =>
  combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    meeting: getMeetingInfoReducer(types),
    delegators: getDelegatorsReducer(types),
    schedulingStatus: getMeetingSchedulingStatusReducer(types),
    updatingStatus: getMeetingUpdatingStatusReducer(types),
    preferences: getMeetingPreferencesReducer(types),
    isPreferencesChanged: getMeetingPreferencesStateReducer(types),
    userSettings: getUserSettingsReducer(types),
    lockedSettings: getLockedSettingsReducer(types),
  });
