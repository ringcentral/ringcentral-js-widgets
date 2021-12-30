import { combineReducers } from 'redux';

import messageTypes from '../../enums/messageTypes';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import { normalizeRecord } from '../../lib/messageHelper';
import status from './status';

export function getSearchInputReducer(types) {
  return (state = '', { type, input = '' }) => {
    switch (type) {
      case types.updateSearchInput:
        return input;
      case types.resetSuccess:
        return '';
      default:
        return state;
    }
  };
}

export function getTypeFilterReducer(types) {
  return (state = messageTypes.all, { type, typeFilter }) => {
    switch (type) {
      case types.updateTypeFilter:
        return typeFilter;
      case types.resetSuccess:
        return messageTypes.all;
      default:
        return state;
    }
  };
}

export function getOldConversationsReducer(types) {
  return (state = [], { type, records, conversationId }) => {
    switch (type) {
      case types.fetchOldConversationsSuccess:
        return [].concat(state).concat(records.map(normalizeRecord));
      case types.deleteConversation:
        return state.filter((c) => c.conversationId !== conversationId);
      case types.cleanOldConversations:
      case types.resetSuccess:
      case types.updateTypeFilter:
      case types.initSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getFetchConversationsStatusReducer(types) {
  return (state = status.idle, { type }) => {
    switch (type) {
      case types.fetchOldConversations:
        return status.fetching;
      case types.fetchOldConversationsSuccess:
      case types.fetchOldConversationsError:
      case types.resetSuccess:
      case types.updateTypeFilter:
      case types.initSuccess:
        return status.idle;
      default:
        return state;
    }
  };
}

export function getCurrentPageReducer(types) {
  return (state = 1, { type, isIncreaseCurrentPage }) => {
    switch (type) {
      case types.increaseCurrentPage:
        return state + 1;
      case types.fetchOldConversationsSuccess:
        return isIncreaseCurrentPage ? state + 1 : state;
      case types.updateTypeFilter:
      case types.resetSuccess:
      case types.initSuccess:
      case types.resetCurrentPage:
        return 1;
      default:
        return state;
    }
  };
}

export function getCurrentConversationIdReducer(types) {
  return (state = null, { type, conversationId }) => {
    switch (type) {
      case types.updateCurrentConversationId:
        return conversationId;
      case types.initSuccess:
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getOldMessagesReducer(types) {
  return (state = [], { type, records }) => {
    switch (type) {
      case types.fetchOldMessagesSuccess:
        return [].concat(state).concat(records.map(normalizeRecord));
      case types.updateCurrentConversationId:
      case types.resetSuccess:
      case types.initSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getFetchMessagesStatusReducer(types) {
  return (state = status.idle, { type }) => {
    switch (type) {
      case types.fetchOldMessages:
        return status.fetching;
      case types.fetchOldMessagesSuccess:
      case types.fetchOldMessagesError:
      case types.updateCurrentConversationId:
      case types.resetSuccess:
      case types.initSuccess:
        return status.idle;
      default:
        return state;
    }
  };
}

export function getMessageTextsReducer(types) {
  return (state = [], { type, text, conversationId }) => {
    switch (type) {
      case types.updateMessageText:
        return [{ conversationId, text }].concat(
          state.filter(
            (msg) =>
              typeof msg === 'object' && msg.conversationId !== conversationId,
          ),
        );
      case types.removeMessageText:
        return state.filter(
          (msg) =>
            typeof msg === 'object' && msg.conversationId !== conversationId,
        );
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getConversationStatusReducer(types) {
  return (state = status.idle, { type }) => {
    switch (type) {
      case types.reply:
        return status.pushing;
      case types.replySuccess:
      case types.replyError:
        return status.idle;
      default:
        return state;
    }
  };
}
export function getCorrespondentMatch(types) {
  return (state = [], { type, entities = [], entity = {} }) => {
    switch (type) {
      case types.addEntities: {
        const newState = [...entities];
        return newState;
      }
      case types.removeEntity: {
        const newState = [...state];
        const filteredState = newState.filter(
          (item) => item.rawId !== entity.id && item.id !== entity.id,
        );
        return filteredState;
      }
      default:
        return state;
    }
  };
}
export function getCorrespondentResponse(types) {
  return (state = {}, { type, responses = [], phoneNumber = '' }) => {
    switch (type) {
      case types.addResponses: {
        const formatResponses = responses.reduce((accumulator, response) => {
          const {
            to,
            from,
            direction,
            conversation: { id },
          } = response;
          const number = direction === 'Inbound' ? from : to[0];
          phoneNumber = number.phoneNumber || number.extensionNumber;
          return {
            ...accumulator,
            [phoneNumber]: id,
          };
        }, {});
        return formatResponses;
      }
      case types.removeResponse: {
        const newState = { ...state };
        delete newState[phoneNumber];
        return newState;
      }
      default:
        return state;
    }
  };
}

export default function getReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    searchInput: getSearchInputReducer(types),
    typeFilter: getTypeFilterReducer(types),
    oldConversations: getOldConversationsReducer(types),
    currentPage: getCurrentPageReducer(types),
    fetchConversationsStatus: getFetchConversationsStatusReducer(types),
    currentConversationId: getCurrentConversationIdReducer(types),
    oldMessages: getOldMessagesReducer(types),
    fetchMessagesStatus: getFetchMessagesStatusReducer(types),
    messageTexts: getMessageTextsReducer(types),
    conversationStatus: getConversationStatusReducer(types),
    correspondentMatch: getCorrespondentMatch(types),
    correspondentResponse: getCorrespondentResponse(types),
  });
}
