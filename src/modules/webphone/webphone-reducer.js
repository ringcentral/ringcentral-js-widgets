import { prefixActions } from '../../lib/redux-helper';
import webphoneActions from './webphone-actions';
import webphoneStatus from '../../enums/webphone-status';

import callReducer from './call-reducer';

export default function getReducer(initialState, prefix) {
  const actions = prefixActions(webphoneActions, prefix);

  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.registerSuccess:
        return Object.assign({}, state, {
          status: webphoneStatus.registerSuccessed,
        });
      case actions.registerError:
        return Object.assign({}, state, {
          status: webphoneStatus.registerFailed,
          error: action.error,
        });
      case actions.call:
        return Object.assign({}, state, {
          status: webphoneStatus.callConnecting,
        });
      case actions.callIncoming:
        return Object.assign({}, state, {
          status: webphoneStatus.callIncoming,
        });
      case actions.callConnect:
        return Object.assign({}, state, {
          status: webphoneStatus.callConnected,
        });
      case actions.callEnd:
        return Object.assign({}, state, {
          status: webphoneStatus.registerSuccessed,
        });
      case actions.callError:
        return Object.assign({}, state, {
          status: webphoneStatus.callFailed,
          error: action.error,
        });
      case actions.callOperation:
        return Object.assign({}, state, {
          operation: callReducer(state.operation, action.operation),
        });

      default:
        return state;
    }
  };
}
