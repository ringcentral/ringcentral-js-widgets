import { expect } from 'chai';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import actionTypes from './actionTypes';
import getConnectivityMonitorReducer, {
  getConnectivityReducer,
  getNetworkLossReducer,
} from './getConnectivityMonitorReducer';

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
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });
    it('should return true on connectSuccess', () => {
      expect(
        reducer(null, {
          type: actionTypes.connectSuccess,
        }),
      ).to.true;
    });
    it('should return false on connectFail', () => {
      expect(
        reducer(null, {
          type: actionTypes.connectFail,
        }),
      ).to.false;
    });
    it('should return flase on networkLoss', () => {
      expect(
        reducer(null, {
          type: actionTypes.networkLoss,
        }),
      ).to.false;
    });
  });
});

describe('getNetworkLossReducer', () => {
  it('should be a function', () => {
    expect(getNetworkLossReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getNetworkLossReducer(actionTypes)).to.be.a('function');
  });
  describe('getNetworkLossReducer', () => {
    const reducer = getNetworkLossReducer(actionTypes);
    it('should have initial state of false', () => {
      expect(reducer(undefined, {})).to.be.false;
    });
    it('should return originalState if type is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });
    it('should return false on connectSuccess', () => {
      expect(
        reducer(null, {
          type: actionTypes.connectSuccess,
        }),
      ).to.false;
    });
    it('should return true on networkLoss', () => {
      expect(
        reducer(null, {
          type: actionTypes.networkLoss,
        }),
      ).to.true;
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
    const networkLossReducer = getNetworkLossReducer(actionTypes);
    it('should return the combined initialState', () => {
      expect(reducer(undefined, {})).to.deep.equal({
        status: statusReducer(undefined, {}),
        connectivity: connectivityReducer(undefined, {}),
        networkLoss: networkLossReducer(undefined, {}),
      });
    });
  });
});
