import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import conversationStatus from './conversationStatus';

export function getConversationStatusReducer(types) {
  return (state = conversationStatus.idle, { type }) => {
    switch (type) {
      case types.reply:
        return conversationStatus.pushing;
      case types.replySuccess:
      case types.replyError:
        return conversationStatus.idle;
      default:
        return state;
    }
  };
}

export function getConversationIdReducer(types) {
  return (state = null, { type, conversationId }) => {
    switch (type) {
      case types.loadId:
      case types.load:
        return conversationId;
      case types.unload:
        return null;
      default:
        return state;
    }
  };
}

export function getMessagesReducer(types) {
  return (state = [], { type, messages }) => {
    switch (type) {
      case types.load:
        return messages;
      case types.unload:
        return [];
      default:
        return state;
    }
  };
}

export function getSenderNumberReducer(types) {
  return (state = null, { type, senderNumber }) => {
    switch (type) {
      case types.load:
        return senderNumber;
      case types.unload:
        return null;
      default:
        return state;
    }
  };
}

export function getRecipientsReducer(types) {
  return (state = [], { type, recipients }) => {
    switch (type) {
      case types.load:
      case types.updateRecipients:
        return recipients;
      case types.unload:
        return [];
      default:
        return state;
    }
  };
}

export function getMessageStoreUpdatedAtReducer(types) {
  return (state = null, { type, conversationsTimestamp }) => {
    switch (type) {
      case types.load: {
        return conversationsTimestamp;
      }
      default:
        return state;
    }
  };
}

export function getMessageTextsReducer(types) {
  return (state = [], { type, text, id }) => {
    switch (type) {
      case types.updateMessages:
        return [{ id, text }].concat(
          state.filter(msg => typeof msg === 'object' && msg.id !== id),
        );
      case types.removeMessage:
        return state.filter(msg => typeof msg === 'object' && msg.id !== id);
      default:
        return state;
    }
  };
}

export default function getConversationReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    conversationStatus: getConversationStatusReducer(types),
    id: getConversationIdReducer(types),
    messages: getMessagesReducer(types),
    senderNumber: getSenderNumberReducer(types),
    recipients: getRecipientsReducer(types),
    messageStoreUpdatedAt: getMessageStoreUpdatedAtReducer(types),
    messageTexts: getMessageTextsReducer(types),
  });
}
