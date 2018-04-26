import { expect } from 'chai';
import actionTypes from './actionTypes';
import getRateLimiterReducer, {
  getTimestampReducer,
} from './getRateLimiterReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

describe('getTimestampReducer', () => {
  it('should be a function', () => {
    expect(getTimestampReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getTimestampReducer(actionTypes)).to.be.a('function');
  });
  describe('timestampReducer', () => {
    const reducer = getTimestampReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return originalState if type is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.timestamp on startThrottle', () => {
      const now = Date.now();
      expect(reducer(null, {
        type: actionTypes.startThrottle,
        timestamp: now,
      })).to.equal(now);
    });
    it('should return null on stopThrottle', () => {
      expect(reducer(null, {
        type: actionTypes.stopThrottle,
      })).to.null;
    });
  });
});

describe('getRateLimiterReducer', () => {
  it('should be a function', () => {
    expect(getRateLimiterReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getRateLimiterReducer(actionTypes)).to.be.a('function');
  });
  describe('serverReducer', () => {
    const reducer = getRateLimiterReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    it('should return the combined initialState', () => {
      expect(reducer(undefined, {})).to.deep.equal({
        status: statusReducer(undefined, {}),
      });
    });
  });
});
