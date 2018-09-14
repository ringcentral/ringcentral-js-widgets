import { combineReducers } from 'redux';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';
import {
  getToNumberFieldReducer,
  getRecipientReducer,
} from '../DialerUI/getReducer';

export function getLastSessionIdReducer(types) {
  return (state = null, { type, sessionId }) => {
    switch (type) {
      case types.setLastSessionId:
        return sessionId;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export default function getReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    toNumberField: getToNumberFieldReducer(types),
    recipient: getRecipientReducer(types),
    lastSessionId: getLastSessionIdReducer(types),
  });
}
