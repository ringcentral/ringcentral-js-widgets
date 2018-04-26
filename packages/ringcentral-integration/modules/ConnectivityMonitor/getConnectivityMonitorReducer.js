import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';


export function getConnectivityReducer(types) {
  return (state = true, { type }) => {
    switch (type) {
      case types.connectFail:
        return false;
      case types.connectSuccess:
        return true;
      default:
        return state;
    }
  };
}

export default function getConnectivityMonitorReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    connectivity: getConnectivityReducer(types),
  });
}
