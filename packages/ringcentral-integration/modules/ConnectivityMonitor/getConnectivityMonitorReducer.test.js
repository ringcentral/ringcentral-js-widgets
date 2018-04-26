import { expect } from 'chai';
import actionTypes from './actionTypes';
import getConnectivityMonitorReducer, {
  getConnectivityReducer,
} from './getConnectivityMonitorReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

describe('getConnectivityReducer', () => {
  it('should be a function', () => {
    expect(getConnectivityReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getConnectivityReducer(actionTypes)).to.be.a('function');
  });
  describe('connectivityReducer', () => {
    const reducer = getConnectivityReducer(actionTypes);
    it('should have initial state of true', () => {
      expect(reducer(undefined, {})).to.be.true;
    });
    it('should return originalState if type is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return true on connectSuccess', () => {
      expect(reducer(null, {
        type: actionTypes.connectSuccess,
      })).to.true;
    });
    it('should return true on connectFail', () => {
      expect(reducer(null, {
        type: actionTypes.connectFail,
      })).to.false;
    });
  });
});

describe('getConnectivityMonitorReducer', () => {
  it('should be a function', () => {
    expect(getConnectivityMonitorReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getConnectivityMonitorReducer(actionTypes)).to.be.a('function');
  });
  describe('serverReducer', () => {
    const reducer = getConnectivityMonitorReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const connectivityReducer = getConnectivityReducer(actionTypes);
    it('should return the combined initialState', () => {
      expect(reducer(undefined, {})).to.deep.equal({
        status: statusReducer(undefined, {}),
        connectivity: connectivityReducer(undefined, {}),
      });
    });
  });
});
