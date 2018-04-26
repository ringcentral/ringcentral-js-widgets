import { expect } from 'chai';
import {
  getMeetingInfoReducer,
  getMeetingSchedulingStatusReducer,
  getMeetingStorageReducer,
} from './getMeetingReducer';

import actionTypes from './actionTypes';
import scheduleStatus from './scheduleStatus';

describe('Meeting :: getMeetingInfoReducer', () => {
  it('should write meeting to store', () => {
    const meeting = {};
    const reducer = getMeetingInfoReducer(actionTypes);
    expect(reducer(null, {
      type: actionTypes.updateMeeting,
      meeting
    })).to.equal(meeting);
  });

  it('should be clear', () => {
    const reducer = getMeetingInfoReducer(actionTypes);
    expect(reducer(null, {
      type: actionTypes.clearMeeting,
    })).to.equal(null);
  });
});

describe('Meeting :: getMeetingSchedulingStatusReducer', () => {
  it('should be able to initScheduling', () => {
    const reducer = getMeetingSchedulingStatusReducer(actionTypes);
    expect(reducer(null, {
      type: actionTypes.initScheduling
    })).to.equal(scheduleStatus.scheduling);
  });

  it('should be able to be scheduled', () => {
    const reducer = getMeetingSchedulingStatusReducer(actionTypes);
    expect(reducer(null, {
      type: actionTypes.scheduled
    })).to.equal(scheduleStatus.scheduled);
  });

  it('should be able to reset', () => {
    const reducer = getMeetingSchedulingStatusReducer(actionTypes);
    expect(reducer(null, {
      type: actionTypes.resetScheduling
    })).to.equal(scheduleStatus.idle);
  });
});

describe('Meeting :: getMeetingStorageReducer', () => {
  // TODO property test _saved property
  it('should store meeting when it is scheduled', () => {
    const meeting = {
      id: 10,
      startHostVideo: true,
      startParticipantsVideo: true,
      allowJoinBeforeHost: true,
      audioOptions: ['ComputerAudio'],
      _saved: false,
    };
    const reducer = getMeetingStorageReducer(actionTypes);
    expect(reducer(null, {
      type: actionTypes.scheduled,
      meeting,
    })).to.deep.equal({
      startHostVideo: true,
      startParticipantsVideo: true,
      allowJoinBeforeHost: true,
      audioOptions: ['ComputerAudio'],
      _saved: false,
    });
  });

  it('should return empty object when meeting is empty', () => {
    const reducer = getMeetingStorageReducer(actionTypes);
    expect(reducer(null, {
      type: actionTypes.scheduled,
      meeting: undefined,
    })).to.deep.equal({});
  });
});
