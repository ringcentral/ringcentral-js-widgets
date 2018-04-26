import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import { AllContactSourceName } from '../../lib/contactHelper';

export function getSearchFilterReducer(types) {
  return (state = '', { type, searchFilter }) => {
    switch (type) {
      case types.updateFilter:
        if (searchFilter !== null && searchFilter !== undefined) {
          return searchFilter;
        }
        return state;
      case types.resetSuccess:
        return '';
      default:
        return state;
    }
  };
}

export function getSourceFilterReducer(types) {
  return (state = AllContactSourceName, { type, sourceFilter }) => {
    switch (type) {
      case types.updateFilter:
        if (sourceFilter !== null && sourceFilter !== undefined) {
          return sourceFilter;
        }
        return state;
      case types.resetSuccess:
        return AllContactSourceName;
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
      case types.resetSuccess:
        return 1;
      default:
        return state;
    }
  };
}

export default function getContactsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    searchFilter: getSearchFilterReducer(types),
    sourceFilter: getSourceFilterReducer(types),
    pageNumber: getPageNumberReducer(types),
  });
}
