import authActions from './auth-actions';
import { prefixActions } from '../../lib/redux-helper';
import loginStatus from '../../enums/login-status';

export default function getReducer(initialState, prefix) {
  const actions = prefixActions(authActions, prefix);
  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);

    if (!action) return state;

    switch (action.type) {

      case actions.initAuth:
        return Object.assign({}, state, { status: action.status });

      case actions.login:
        return Object.assign({}, state, {
          status: loginStatus.userAccessPending,
          error: null,
        });

      case actions.loginSuccess:
        return Object.assign({}, state, {
          status: loginStatus.userAccess,
          error: null,
        });

      case actions.logoutSuccess:
        return Object.assign({}, state, {
          status: loginStatus.notLoggedIn,
          error: null,
        });

      case actions.loginError:
        return Object.assign({}, state, {
          state: loginStatus.notLoggedIn,
          error: action.error,
        });

      case actions.logoutError:
        return Object.assign({}, state, {
          error: action.error,
        });

      default:
        return state;
    }
  };
}
