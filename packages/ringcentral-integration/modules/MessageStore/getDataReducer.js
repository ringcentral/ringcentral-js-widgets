import { combineReducers } from 'redux';
import {
  pushRecordsToMessageData,
  updateConversationRecipients,
} from './messageStoreHelper';

const initialConversationsDataState = {
  conversations: [],
  conversationMap: {},
  messages: [],
};
export function getMessageDataReducer(types) {
  return (state = initialConversationsDataState, {
    type,
    records,
    syncToken = null,
    syncConversationId = null,
    conversationId = null,
    messageId = null,
    recipients = null,
  }) => {
    switch (type) {
      case types.syncSuccess:
      case types.updateMessages:
        return pushRecordsToMessageData({
          ...state,
          records,
          syncToken,
        });
      case types.syncConversationSuccess:
        return pushRecordsToMessageData({
          ...state,
          records,
          syncToken,
          syncConversationId,
        });
      case types.updateConversationRecipients:
        return updateConversationRecipients({
          ...state,
          conversationId,
          recipients,
        });
      case types.removeMessage: {
        const newConversationMap = {};
        const newConversations = [];
        state.conversations.forEach((conversation) => {
          if (conversation && conversation.conversationId !== conversationId) {
            newConversations.push({ ...conversation });
            if (state.conversationMap[conversation.conversationId]) {
              newConversationMap[conversation.conversationId] = {
                ...state.conversationMap[conversation.conversationId],
                index: (newConversations.length - 1),
                unreadMessages: {
                  ...state.conversationMap[conversation.conversationId].unreadMessages,
                },
              };
            }
          }
        });
        return {
          conversations: newConversations,
          conversationMap: newConversationMap,
          messages: state.messages.filter(
            message => message.id !== messageId
          ),
        };
      }
      case types.cleanUp:
      case types.resetSuccess:
        return initialConversationsDataState;
      default:
        return state;
    }
  };
}

export function getUpdatedTimestampReducer(types) {
  return (state = null, { type }) => {
    switch (type) {
      case types.syncSuccess:
      case types.syncConversationSuccess:
      case types.updateConversationRecipients:
      case types.updateMessages:
        return Date.now();
      case types.resetSuccess:
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

export function getSyncTokenReducer(types) {
  return (state = null, { type, syncToken }) => {
    switch (type) {
      case types.syncSuccess:
        return syncToken;
      case types.resetSuccess:
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

export function getSyncTimestampReducer(types) {
  return (state = null, { type, syncTimestamp }) => {
    switch (type) {
      case types.syncSuccess:
        return syncTimestamp;
      case types.resetSuccess:
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

export default function getDataReducer(types) {
  return combineReducers({
    data: getMessageDataReducer(types),
    updatedTimestamp: getUpdatedTimestampReducer(types),
    syncToken: getSyncTokenReducer(types),
    syncTimestamp: getSyncTimestampReducer(types),
  });
}
