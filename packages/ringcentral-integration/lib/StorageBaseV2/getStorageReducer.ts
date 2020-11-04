import { ReducersMapObject, Reducer } from 'redux';
import { ActionTypesBase } from './actionTypesBase';

function calculateInitialState(reducers: ReducersMapObject) {
  const initialState: Record<string, unknown> = {};
  /* eslint-disable guard-for-in */
  for (const key in reducers) {
    initialState[key] = reducers[key](undefined, {} as any);
  }
  return initialState;
}

export function getDataReducer({
  types,
  reducers,
}: {
  types: ActionTypesBase;
  reducers: ReducersMapObject;
}): Reducer {
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
        const newState: Record<string, unknown> = {};
        // reset the data to initial states
        /* eslint-disable guard-for-in */
        for (const key in reducers) {
          newState[key] = reducers[key](undefined, action);
        }
        return newState;
      }
      default: {
        const newState: Record<string, unknown> = {};
        let hasChange = false;
        // compute new sub states and check for changes
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
