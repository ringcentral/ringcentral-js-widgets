import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getDataReducer(types: any) {
  return (state = [], { type, data, group }: any) => {
    switch (type) {
      case types.fetchSuccess:
        return data && data.records;
      case types.updateGroup:
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        return [group].concat(state.filter((g) => g.id !== group.id));
      case types.removeGroup:
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        return state.filter((g) => g.id !== group.id);
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getSearchFilterReducer(types: any) {
  return (state = '', { type, searchFilter }: any) => {
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

export function getCurrentGroupIdReducer(types: any) {
  return (state = null, { type, groupId }: any) => {
    switch (type) {
      case types.updateCurrentGroupId:
        return groupId;
      default:
        return state;
    }
  };
}

export function getTimestampReducer(types: any) {
  return (state = null, { type, timestamp }: any) => {
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

export default function getReducer(types: any, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    searchFilter: getSearchFilterReducer(types),
    currentGroupId: getCurrentGroupIdReducer(types),
  });
}
