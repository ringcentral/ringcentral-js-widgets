import { prefixActions } from '../../lib/redux-helper';
import authActions from './auth-actions';
import loginStatus from './login-status';

const initialState = {
  status: loginStatus.pending,
  error: null,
};

export default function getAuthReducer(prefix) {
  const actions = prefixActions(authActions, prefix);
  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.init:
        return Object.assign({}, state, { status: action.status });

      case actions.login:
        return {
          status: loginStatus.loggingIn,
          error: null,
        };

      case actions.logout:
        return {
          status: loginStatus.loggingOut,
          error: null,
        };

      case actions.loginSuccess:
        return {
          status: loginStatus.loggedIn,
          error: null,
        };

      case actions.logoutSuccess:
        return {
          status: loginStatus.notLoggedIn,
          error: null,
        };

      case actions.loginError:
        return {
          status: loginStatus.notLoggedIn,
          error: action.error,
        };

      case actions.logoutError:
        return {
          status: loginStatus.loggedIn,
          error: action.error,
        };

      default:
        return state;
    }
  };
}
