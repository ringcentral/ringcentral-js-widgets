import { combineReducers } from 'redux';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';
import { getOAuthReadyReducer } from '../../lib/OAuthBase/getOAuthBaseReducer';

export function getProxyRetryCountReducer(types) {
  return (state = 0, { type }) => {
    switch (type) {
      case types.setupProxy:
      case types.clearOAuth:
      case types.setupOAuth:
        return 0;
      case types.proxyRetry:
        return state + 1;
      default:
        return state;
    }
  };
}

export default function getAuthReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    oAuthReady: getOAuthReadyReducer(types),
    proxyRetryCount: getProxyRetryCountReducer(types),
  });
}
