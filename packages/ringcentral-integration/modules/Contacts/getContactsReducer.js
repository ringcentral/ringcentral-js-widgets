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

export default function getContactsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    searchFilter: getSearchFilterReducer(types),
    sourceFilter: getSourceFilterReducer(types),
  });
}
