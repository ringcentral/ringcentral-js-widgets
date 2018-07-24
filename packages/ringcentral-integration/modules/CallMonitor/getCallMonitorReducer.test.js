import { expect } from 'chai';
import { getCallMatchedReducer } from './getCallMonitorReducer';

import callMonitorActionTypes from './actionTypes';

describe('CallMonitor :: getCallMatchedReducer', () => {
  it('should be a function', () => {
    expect(getCallMatchedReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getCallMatchedReducer()).to.be.a('function');
  });
  describe('getCallMatchedReducer', () => {
    const reducer = getCallMatchedReducer(callMonitorActionTypes);
    it('should have empty object for initial state ', () => {
      expect(reducer({}, {})).to.deep.equal({});
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = '123';
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return added session map on setData', () => {
      const originalState = {
        abcdefg: '01234',
      };
      expect(reducer(originalState, {
        type: callMonitorActionTypes.setData,
        sessionId: 'hijklmn',
        toEntityId: '56789',
      })).to.deep.equal({
        abcdefg: '01234',
        hijklmn: '56789',
      });
    });
  });
});
