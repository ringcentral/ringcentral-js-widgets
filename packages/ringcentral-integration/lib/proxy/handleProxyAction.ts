import {
  applyPatches,
  RcModuleV2,
  usmAction,
} from '@ringcentral-integration/core';

export const dropStates = (action: any) => {
  // In `_state`/`params`/`_inversePatches`, there may be a large amount of data that needs to be serialized from server to client.
  const { _state, params, _inversePatches, ...actionRest } = action;
  if (action._usm === usmAction) {
    // drop states for reduction of serialized data
    return actionRest;
  }
  return action;
};

export const pushStates = (target: RcModuleV2, action: any) => {
  if (action._usm === usmAction) {
    // restore changes states for reduction of serialized data from `patches`
    const _state = applyPatches(target.store.getState(), action._patches);
    return {
      ...action,
      _state,
    };
  }
  return action;
};
