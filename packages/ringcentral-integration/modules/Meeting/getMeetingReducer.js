import { combineReducers } from 'redux';
import { filter } from 'ramda';
import scheduleStatus from './scheduleStatus';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getMeetingInfoReducer(types) {
  return (state = null, { type, meeting = null }) => {
    switch (type) {
      case types.updateMeeting: return meeting;
      case types.clearMeeting: return null;
      default: return state;
    }
  };
}

export function getMeetingSchedulingStatusReducer(types) {
  return (state = scheduleStatus.idle, { type }) => {
    switch (type) {
      case types.initScheduling:
        return scheduleStatus.scheduling;
      case types.scheduled:
        return scheduleStatus.scheduled;
      case types.resetScheduling:
        return scheduleStatus.idle;
      default: return state;
    }
  };
}

export function getMeetingUpdatingStatusReducer(types) {
  return (state = [], { type, meetingId }) => {
    switch (type) {
      case types.initUpdating:
        return [...state, {
          // using object type for further recording
          meetingId,
        }];
      case types.updated:
      case types.resetUpdating:
        return filter(obj => obj.meetingId !== meetingId, state);
      default: return state;
    }
  };
}

export function getMeetingStorageReducer(types) {
  return (state = {}, { type, meeting = null }) => {
    switch (type) {
      case types.scheduled:
        return meeting ? {
          startHostVideo: meeting.startHostVideo,
          startParticipantsVideo: meeting.startParticipantsVideo,
          allowJoinBeforeHost: meeting.allowJoinBeforeHost,
          audioOptions: meeting.audioOptions,
          _saved: meeting._saved,
        } : {};
      default: return state;
    }
  };
}

export default (types, reducers) => combineReducers({
  ...reducers,
  status: getModuleStatusReducer(types),
  meeting: getMeetingInfoReducer(types),
  schedulingStatus: getMeetingSchedulingStatusReducer(types),
  updatingStatus: getMeetingUpdatingStatusReducer(types),
});
