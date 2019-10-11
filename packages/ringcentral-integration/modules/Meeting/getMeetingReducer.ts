import { combineReducers } from 'redux';
import { filter } from 'ramda';
import scheduleStatus from './scheduleStatus';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import { MeetingActionTypes } from './actionTypes';

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

export function getMeetingUpdatingStatusReducer(types) {
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

export function getMeetingStorageReducer(types) {
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

export function getDefaultMeetingSettingReducer(types) {
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

export default (types, reducers) =>
  combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    meeting: getMeetingInfoReducer(types),
    schedulingStatus: getMeetingSchedulingStatusReducer(types),
    updatingStatus: getMeetingUpdatingStatusReducer(types),
  });
