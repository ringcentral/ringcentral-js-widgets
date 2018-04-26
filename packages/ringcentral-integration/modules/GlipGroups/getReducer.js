import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getDataReducer(types) {
  return (state = [], { type, data, group }) => {
    switch (type) {
      case types.fetchSuccess:
        return data && data.records;
      case types.updateGroup:
        return [group].concat(state.filter(g => g.id !== group.id));
      case types.removeGroup:
        return state.filter(g => g.id !== group.id);
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getPageNumberReducer(types) {
  return (state = 1, { type, pageNumber }) => {
    switch (type) {
      case types.updateFilter:
        if (pageNumber) {
          return pageNumber;
        }
        return state;
      default:
        return state;
    }
  };
}

export function getSearchFilterReducer(types) {
  return (state = '', { type, searchFilter }) => {
    switch (type) {
      case types.updateFilter:
        if (searchFilter !== null && searchFilter !== undefined) {
          return searchFilter;
        }
        return state;
      default:
        return state;
    }
  };
}

export function getCurrentGroupIdReducer(types) {
  return (state = null, { type, groupId }) => {
    switch (type) {
      case types.updateCurrentGroupId:
        return groupId;
      default:
        return state;
    }
  };
}

export function getTimestampReducer(types) {
  return (state = null, { type, timestamp }) => {
    switch (type) {
      case types.fetchSuccess:
        return timestamp;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export default function getReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    searchFilter: getSearchFilterReducer(types),
    pageNumber: getPageNumberReducer(types),
  });
}
