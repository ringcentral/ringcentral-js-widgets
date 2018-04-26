import { combineReducers } from 'redux';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';


export function getOAuthReadyReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.setupOAuth:
        return true;
      case types.destroyOAuth:
        return false;
      default:
        return state;
    }
  };
}
export default function getOAuthBaseReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    oAuthReady: getOAuthReadyReducer(types),
  });
}
