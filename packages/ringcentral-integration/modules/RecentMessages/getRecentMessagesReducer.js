import { combineReducers } from 'redux';
import messageStatus from './messageStatus';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getContactsReducer(types) {
  return (state = {}, { type, contact, sessionId }) => {
    const contactId = String(contact && contact.id);
    if (type === types.loadSuccess) {
      return {
        ...state,
        [sessionId ? `${contactId}-${sessionId}` : contactId]: contact
      };
    } else if (type === types.loadReset) {
      const { [sessionId ? `${contactId}-${sessionId}` : contactId]: _, ...rest } = state;
      return rest;
    }
    return state;
  };
}

export function getMessagesReducer(types) {
  return (state = {}, {
    type, contact, messages, sessionId
  }) => {
    const contactId = String(contact && contact.id);
    if (type === types.loadSuccess) {
      return {
        ...state,
        [sessionId ? `${contactId}-${sessionId}` : contactId]: messages
      };
    } else if (type === types.loadReset) {
      const { [sessionId ? `${contactId}-${sessionId}` : contactId]: _, ...rest } = state;
      return rest;
    }
    return state;
  };
}

export function getMessageStatusReducer(types) {
  return (state = null, { type }) => {
    switch (type) {
      case types.initLoad:
        return messageStatus.loading;
      case types.loadReset:
      case types.loadSuccess:
        return messageStatus.loaded;
      default:
        return state;
    }
  };
}

export default function getRecentMessagesReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    contacts: getContactsReducer(types),
    messages: getMessagesReducer(types),
    messageStatus: getMessageStatusReducer(types)
  });
}
