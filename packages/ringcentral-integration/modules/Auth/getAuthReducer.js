import { combineReducers } from 'redux';
import loginStatus from './loginStatus';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getLoginStatusReducer(types) {
  return (state = null, { type, loggedIn, refreshTokenValid }) => {
    switch (type) {
      case types.login:
        return loginStatus.loggingIn;

      case types.loginSuccess:
      case types.refreshSuccess:
      case types.cancelLogout:
        return loginStatus.loggedIn;

      case types.loginError:
      case types.logoutSuccess:
      case types.logoutError:
        return loginStatus.notLoggedIn;

      case types.refreshError:
        return refreshTokenValid ? state : loginStatus.notLoggedIn;

      case types.logout:
        return loginStatus.loggingOut;

      case types.beforeLogout:
        return loginStatus.beforeLogout;

      case types.initSuccess:
      case types.tabSync:
        return loggedIn ? loginStatus.loggedIn : loginStatus.notLoggedIn;

      default:
        return state;
    }
  };
}

export function getTokenReducer(types) {
  return (state = {}, { type, token, refreshTokenValid }) => {
    switch (type) {
      case types.loginSuccess:
      case types.refreshSuccess:
        return {
          ownerId: token.owner_id,
          endpointId: token.endpoint_id,
          accessToken: token.access_token,
          expireTime: token.expire_time,
          expiresIn: token.expires_in,
        };
      case types.loginError:
      case types.logoutSuccess:
      case types.logoutError:
        return {};

      case types.refreshError:
        if (refreshTokenValid) {
          return state;
        }
        return {};
      case types.initSuccess:
      case types.tabSync:
        if (token) {
          return {
            ownerId: token.owner_id,
            endpointId: token.endpoint_id,
            accessToken: token.access_token,
            expireTime: token.expire_time,
            expiresIn: token.expires_in,
          };
        }
        return {};
      default:
        return state;
    }
  };
}

export function getFreshLoginReducer(types) {
  return (state = null, { type, loggedIn }) => {
    switch (type) {
      case types.initSuccess:
      case types.tabSync:
        return loggedIn ? false : null;

      case types.login:
        return true;

      case types.loginError:
      case types.refreshError:
      case types.logoutSuccess:
      case types.logoutError:
        return null;

      default:
        return state;
    }
  };
}

export default function getAuthReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    loginStatus: getLoginStatusReducer(types),
    freshLogin: getFreshLoginReducer(types),
    token: getTokenReducer(types),
  });
}
