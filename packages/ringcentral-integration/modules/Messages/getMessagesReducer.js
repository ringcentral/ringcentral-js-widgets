import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import messageTypes from '../../enums/messageTypes';

export function getCurrentPageReducer(types) {
  return (state = 0, { type, page = state }) => {
    switch (type) {
      case types.previousPage:
        return Math.max(state - 1, 0);
      case types.nextPage:
        return state + 1;
      case types.setPage:
        return page;
      case types.resetSuccess:
        return 0;
      default:
        return state;
    }
  };
}


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

export function getPerPageReducer(types, defaultPerPage = 20) {
  return (state = defaultPerPage, { type, perPage = defaultPerPage }) => {
    switch (type) {
      case types.setPerPage:
        return perPage;
      case types.resetSuccess:
        return defaultPerPage;
      default:
        return state;
    }
  };
}

export default function getMessagesReducer(types, defaultPerPage) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    currentPage: getCurrentPageReducer(types),
    perPage: getPerPageReducer(types, defaultPerPage),
    searchInput: getSearchInputReducer(types),
    typeFilter: getTypeFilterReducer(types),
  });
}
