import { combineReducers } from 'redux';
import getModuleStatusReducer from '../getModuleStatusReducer';

function calculateInitialState(reducers) {
  const initialState = {};
  /* eslint-disable guard-for-in */
  for (const key in reducers) {
    initialState[key] = reducers[key](undefined, {});
  }
  return initialState;
}

export function getDataReducer({ types, reducers }) {
  return (state = calculateInitialState(reducers), action) => {
    switch (action.type) {
      case types.initSuccess:
        return action.data;
      case types.sync:
        return {
          ...state,
          [action.key]: action.value,
        };
      case types.resetSuccess: {
        const newState = {};
        // reset the data to initial states
        /* eslint-disable guard-for-in */
        for (const key in reducers) {
          newState[key] = reducers[key](undefined, action);
        }
        return newState;
      }
      default: {
        const newState = {};
        let hasChange = false;
        // compute new substates and check for changes
        /* eslint-disable guard-for-in */
        for (const key in reducers) {
          newState[key] = reducers[key](state[key], action);
          if (newState[key] !== state[key]) hasChange = true;
        }
        return hasChange ? newState : state;
      }
    }
  };
}

export function getStorageKeyReducer(types) {
  return (state = null, { type, storageKey }) => {
    switch (type) {
      case types.initSuccess:
        return storageKey;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

export default function getStorageReducer({ types, reducers }) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    data: getDataReducer({ types, reducers }),
    storageKey: getStorageKeyReducer(types),
  });
}
