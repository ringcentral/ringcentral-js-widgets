import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import contactSearchStatus from './contactSearchStatus';

export function getContactSearchStatusReducer(types) {
  return (state = contactSearchStatus.idle, { type }) => {
    switch (type) {
      case types.search:
        return contactSearchStatus.searching;

      case types.prepareSearch:
      case types.searchSuccess:
      case types.searchError:
        return contactSearchStatus.idle;

      default:
        return state;
    }
  };
}

export function getSearchingReducer(types) {
  const initialState = {
    searchOnSources: [],
    searchString: '',
    result: [],
  };
  return (state = initialState, {
    type,
    searchOnSources,
    searchString,
    entities,
  }) => {
    switch (type) {
      case types.searchSuccess:
        if (
          state.searchString === searchString &&
          state.searchOnSources.join(',') === searchOnSources.join(',')
        ) {
          const resultMap = {};
          const newResult = [];
          state.result.forEach((item) => {
            resultMap[item.id] = 1;
            newResult.push(item);
          });
          entities.forEach((item) => {
            if (resultMap[item.id]) {
              return;
            }
            newResult.push(item);
            resultMap[item.id] = 1;
          });
          return {
            ...state,
            result: newResult,
          };
        }
        return {
          searchOnSources,
          searchString,
          result: entities
        };
      case types.resetSuccess:
      case types.prepareSearch:
      case types.reset:
      case types.searchError:
        return initialState;
      case types.search:
      default:
        return state;
    }
  };
}

export default function getContactSearchReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    searchStatus: getContactSearchStatusReducer(types),
    searching: getSearchingReducer(types),
  });
}
