import { applyPatches, RcModuleV2 } from '@ringcentral-integration/core';
import { Action } from 'redux';
import RcModule from '../RcModule';

interface ProxyAction extends Action<string | string[]> {
  states: Record<string, any>;
  patches: any[];
  __name__: string;
}

export const dropStates = (action: ProxyAction) => {
  const { states, ...actionRest } = action;
  if (Array.isArray(action.type) && Array.isArray(action.patches)) {
    // drop states for reduction of serialized data
    return actionRest;
  }
  return action;
};

export const pushStates = (
  target: Record<string, RcModule | RcModuleV2>,
  action: ProxyAction,
) => {
  if (
    Array.isArray(action.type) &&
    Array.isArray(action.patches) &&
    typeof action.__name__ === 'string'
  ) {
    // restore changes states for reduction of serialized data from `patches`
    const states = applyPatches(target[action.__name__].state, action.patches);
    return {
      ...action,
      states,
    };
  }
  return action;
};
