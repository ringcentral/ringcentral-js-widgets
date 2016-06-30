import { prefixActions } from '../../lib/redux-helper';
import userActions from './user-actions';


const initialState = {
  accountInfo: null,
  extensionInfo: null,
  dialingPlans: [],
  phoneNumbers: [],
  forwardingNumbers: [],
  blockedNumbers: [],
};

export default function getUserReducer(prefix) {
  const actions = prefixActions(userActions, prefix);
  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.loadUserInfo:
        return Object.assign({}, state, action.payload);

      case actions.clearUserInfo:
        return Object.assign({}, state, initialState);

      default:
        return state;
    }
  };
}
