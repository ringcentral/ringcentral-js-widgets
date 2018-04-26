import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import callStatus from './callStatus';

export function getCallsReducer(types) {
  return (state = {}, {
    type, contact, calls, sessionId
  }) => {
    const contactId = String(contact && contact.id);
    if (type === types.loadSuccess) {
      return {
        ...state,
        [sessionId ? `${contactId}-${sessionId}` : contactId]: calls
      };
    } else if (type === types.loadReset) {
      const { [sessionId ? `${contactId}-${sessionId}` : contactId]: _, ...rest } = state;
      return rest;
    }
    return state;
  };
}

export function getCallStatusReducer(types) {
  return (state = null, { type }) => {
    switch (type) {
      case types.initLoad:
        return callStatus.loading;
      case types.loadReset:
      case types.loadSuccess:
        return callStatus.loaded;
      default:
        return state;
    }
  };
}

export default function getRecentCallsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    calls: getCallsReducer(types),
    callStatus: getCallStatusReducer(types)
  });
}
