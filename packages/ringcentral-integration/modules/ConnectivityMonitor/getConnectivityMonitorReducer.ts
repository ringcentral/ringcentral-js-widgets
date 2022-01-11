import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getConnectivityReducer(types) {
  return (state = true, { type }) => {
    switch (type) {
      case types.connectFail:
      case types.networkLoss:
        return false;
      case types.connectSuccess:
        return true;
      default:
        return state;
    }
  };
}

export function getNetworkLossReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.networkLoss:
        return true;
      case types.connectSuccess:
        return false;
      default:
        return state;
    }
  };
}

export default function getConnectivityMonitorReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    connectivity: getConnectivityReducer(types),
    networkLoss: getNetworkLossReducer(types),
  });
}
