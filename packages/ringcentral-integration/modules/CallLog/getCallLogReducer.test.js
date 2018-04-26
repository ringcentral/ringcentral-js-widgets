import { expect } from 'chai';
import actionTypes from './actionTypes';
import {
  getDataReducer,
  getTimestampReducer,
  getTokenReducer,
} from './getCallLogReducer';


describe('getDataReducer', () => {
  it('should be a function', () => {
    expect(getDataReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getDataReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('dataReducer', () => {
    const reducer = getDataReducer(actionTypes);
    it('should have initial state of []', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return [] on resetSuccess', () => {
      expect(reducer([1, 2, 3], {
        type: actionTypes.resetSuccess,
      })).to.deep.equal([]);
    });
    it('should return filtered state on init', () => {
      const now = Date.now();
      const daySpanList = [0, 1, 2, 3, 4, 5, 6, 7];
      const originalState = daySpanList.map(daySpan => ({
        id: `${daySpan}`,
        startTime: now - (daySpan * 24 * 60 * 60 * 1000),
      }));
      daySpanList.forEach((daySpan) => {
        expect(reducer(originalState, {
          type: actionTypes.init,
          daySpan,
        }).length).to.equal(daySpan + 1);
      });
    });
    it('should return a combined list of call logs on iSyncSuccess and fSyncSuccess', () => {
      const now = Date.now();
      const daySpanList = [0, 1, 2, 3, 4, 5, 6, 7];
      const entries = daySpanList.map(daySpan => ({
        id: `${daySpan}`,
        startTime: now - (daySpan * 24 * 60 * 60 * 1000),
        direction: 'Outbound',
      }));
      expect(reducer(entries.slice(3, 5), {
        type: actionTypes.iSyncSuccess,
        records: entries.slice(0, 4),
        supplementRecords: entries.slice(4, 8),
        daySpan: 7,
      })).to.deep.equal(entries);
      expect(reducer(entries.slice(3, 5), {
        type: actionTypes.fSyncSuccess,
        records: entries.slice(0, 4),
        supplementRecords: entries.slice(4, 8),
        daySpan: 7,
      })).to.deep.equal(entries);
      // check for cut off time on supplementRecords
      expect(reducer(entries.slice(3, 5), {
        type: actionTypes.iSyncSuccess,
        records: entries.slice(0, 4),
        supplementRecords: entries.slice(4, 8),
        daySpan: 4,
      })).to.deep.equal(entries.slice(0, 5));
      expect(reducer(entries.slice(3, 5), {
        type: actionTypes.fSyncSuccess,
        records: entries.slice(0, 4),
        supplementRecords: entries.slice(4, 8),
        daySpan: 5,
      })).to.deep.equal(entries.slice(0, 6));
      // check for cut off time on original state
      expect(reducer(entries.slice(3), {
        type: actionTypes.iSyncSuccess,
        records: entries.slice(0, 4),
        supplementRecords: entries.slice(4, 8),
        daySpan: 4,
      })).to.deep.equal(entries.slice(0, 5));
      expect(reducer(entries.slice(3), {
        type: actionTypes.fSyncSuccess,
        records: entries.slice(0, 4),
        supplementRecords: entries.slice(4, 8),
        daySpan: 5,
      })).to.deep.equal(entries.slice(0, 6));
      // check for cut off time on records
      expect(reducer(entries.slice(0, 5), {
        type: actionTypes.iSyncSuccess,
        records: entries.slice(0),
        supplementRecords: entries.slice(4, 8),
        daySpan: 4,
      })).to.deep.equal(entries.slice(0, 5));
      expect(reducer(entries.slice(0, 5), {
        type: actionTypes.fSyncSuccess,
        records: entries.slice(0),
        supplementRecords: entries.slice(4, 8),
        daySpan: 5,
      })).to.deep.equal(entries.slice(0, 6));
    });
  });
});

describe('getTimestampReducer', () => {
  it('should be a function', () => {
    expect(getTimestampReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getTimestampReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('timestampReducer', () => {
    const reducer = getTimestampReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.timestamp on iSyncSuccess, fSyncSuccess', () => {
      const timestamp = Date.now();
      expect(reducer(null, {
        type: actionTypes.iSyncSuccess,
        timestamp,
      })).to.equal(timestamp);
      expect(reducer(null, {
        type: actionTypes.fSyncSuccess,
        timestamp,
      })).to.equal(timestamp);
    });
    it('should return null on resetSuccess and clearToken', () => {
      expect(reducer(Date.now(), {
        type: actionTypes.resetSuccess,
      })).to.be.null;
      expect(reducer(Date.now(), {
        type: actionTypes.clearToken,
      })).to.be.null;
    });
  });
});


describe('getTokenReducer', () => {
  it('should be a function', () => {
    expect(getTokenReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getTokenReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('tokenReducer', () => {
    const reducer = getTokenReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.syncToken on iSyncSuccess, fSyncSuccess', () => {
      const syncToken = {};
      expect(reducer(null, {
        type: actionTypes.iSyncSuccess,
        syncToken,
      })).to.equal(syncToken);
      expect(reducer(null, {
        type: actionTypes.fSyncSuccess,
        syncToken,
      })).to.equal(syncToken);
    });
    it('should return null on resetSuccess and clearToken', () => {
      expect(reducer(Date.now(), {
        type: actionTypes.resetSuccess,
      })).to.be.null;
      expect(reducer(Date.now(), {
        type: actionTypes.clearToken,
      })).to.be.null;
    });
  });
});
