import type { Reducer, ReducersMapObject } from 'redux';

import { usmAction } from '@ringcentral-integration/core';

import type { ActionTypesBase } from './actionTypesBase';

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
    if (
      action._usm === usmAction &&
      (action.type === 'globalStorage' || action.type === 'storage')
    ) {
      // usm-redux update data with generic reducer for globalStorage & storage.
      const [name] = types.init.split('-');
      if (name === action.type) {
        // for proxy storage state
        if (action._state.target) {
          return action._state.target[action.type].data;
        }
        return action._state.data;
      }
    }
    const newState: Record<string, unknown> = {};
    let hasChange = false;
    // compute new sub states and check for changes
    /* eslint-disable guard-for-in */
    for (const key in reducers) {
      newState[key] = reducers[key](state[key], action);
      if (newState[key] !== state[key]) hasChange = true;
    }
    return hasChange ? newState : state;
  };
}
