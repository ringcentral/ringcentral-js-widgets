import { expect } from 'chai';
import getDataFetcherReducer, {
  getDefaultDataReducer,
  getDefaultTimestampReducer,
  getRetryCountReducer,
} from './getDataFetcherReducer';
import getModuleStatusReducer from '../getModuleStatusReducer';
import actionTypes from './baseActionTypes';

describe('getDefaultDataReducer', () => {
  it('should be a function', () => {
    expect(getDefaultDataReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getDefaultDataReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('defaultDataReducer', () => {
    const reducer = getDefaultDataReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.data on fetchSuccess', () => {
      const data = {};
      expect(reducer(null, {
        type: actionTypes.fetchSuccess,
        data,
      })).to.equal(data);
    });
    it('should return original state on initSuccess', () => {
      const originalState = [];
      expect(reducer(originalState, {
        type: actionTypes.initSuccess,
      })).to.equal(originalState);
    });
    it('should return null on initSuccess when permission is false', () => {
      const originalState = [];
      expect(reducer(originalState, {
        type: actionTypes.initSuccess,
        hasPermission: false,
      })).to.equal(null);
    });
    it('should return originalState on initSuccess when permission is true', () => {
      const originalState = [];
      expect(reducer(originalState, {
        type: actionTypes.initSuccess,
        hasPermission: true,
      })).to.equal(originalState);
    });
    it('should return original state on resetSuccess', () => {
      const originalState = [];
      expect(reducer(originalState, {
        type: actionTypes.resetSuccess,
      })).to.equal(originalState);
    });
    it('should return original state on resetSuccess when cleanOnReset is false', () => {
      const originalState = [];
      expect(reducer(originalState, {
        type: actionTypes.resetSuccess,
        cleanOnReset: false,
      })).to.equal(originalState);
    });
    it('should return original state on resetSuccess', () => {
      const originalState = [];
      expect(reducer(originalState, {
        type: actionTypes.resetSuccess,
        cleanOnReset: true,
      })).to.equal(null);
    });
  });
});

describe('getDefaultTimestampReducer', () => {
  it('should be a function', () => {
    expect(getDefaultTimestampReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getDefaultTimestampReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('defaultTimestampReducer', () => {
    const reducer = getDefaultTimestampReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.timestamp on fetchSuccess', () => {
      const timestamp = Date.now();
      expect(reducer(null, {
        type: actionTypes.fetchSuccess,
        timestamp,
      })).to.equal(timestamp);
    });
  });
});

describe('getDataFetcherReducer', () => {
  it('should be a function', () => {
    expect(getDataFetcherReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getDataFetcherReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getDataFetcherReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const retryCountReducer = getRetryCountReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      retryCount: retryCountReducer(undefined, {}),
    });
  });
});
