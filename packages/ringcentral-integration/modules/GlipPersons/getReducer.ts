import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import status from './status';

export function getGlipPersonsStatusReducer(types: any) {
  return (state = status.idle, { type }: any) => {
    switch (type) {
      case types.fetch:
        return status.fetching;
      case types.fetchError:
      case types.fetchSuccess:
      case types.batchFetchSuccess:
        return status.idle;
      default:
        return state;
    }
  };
}

export function getGlipPersonStoreReducer(types: any) {
  return (state = {}, { type, person, persons }: any) => {
    let newState;
    switch (type) {
      case types.fetchSuccess:
        newState = {
          ...state,
        };
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        newState[person.id] = person;
        return newState;
      case types.batchFetchSuccess:
        newState = {
          ...state,
        };
        persons.forEach((p: any) => {
          if (p.id) {
            newState[p.id] = p;
          }
        });
        return newState;
      case types.cleanUp:
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export default function getGlipPostsReducer(types: any, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    glipPostsStatus: getGlipPersonsStatusReducer(types),
  });
}
