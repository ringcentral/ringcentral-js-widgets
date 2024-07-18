/* eslint-disable func-names */
import type { Patch } from 'immer';
import { produceWithPatches, produce } from 'immer';

import { checkPatches } from '../checkPatches';
import { storeKey, identifierKey, usm } from '../constant';
import { getPatchesToggle } from '../createStore';
import type { Service, Action } from '../interface';
import {
  getStagedModule,
  getStagedState,
  setStagedModule,
  setStagedState,
} from '../utils/index';

export const action = (
  target: object,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>,
) => {
  const fn = descriptor.value;
  if (typeof fn !== 'function') {
    throw new Error(
      `${String(key)} can only be decorated by '@action' as a class method.`,
    );
  }
  const value = function (this: Service, ...args: unknown[]) {
    let time: number;
    if (process.env.NODE_ENV === 'development') {
      time = Date.now();
    }
    if (typeof getStagedState() === 'undefined') {
      try {
        const lastState: Record<string, any> =
          this._getLastState?.() ?? this[storeKey].getState();
        let state: Record<string, any> | undefined;
        let patches: Patch[] = [];
        let inversePatches: Patch[] = [];
        const recipe = (draftState: Record<string, unknown>) => {
          setStagedState(draftState);
          if (process.env.NODE_ENV !== 'production') {
            setStagedModule(this._modulePath);
          }
          fn.apply(this, args);
        };
        const enablePatches = getPatchesToggle();
        if (enablePatches) {
          [state, patches, inversePatches] = produceWithPatches(
            lastState,
            recipe,
          );
        } else {
          state = produce(lastState, recipe);
        }
        setStagedState(undefined);
        if (process.env.NODE_ENV !== 'production') {
          setStagedModule(undefined);
        }
        const changed = lastState !== state;
        if (process.env.NODE_ENV === 'development') {
          if (!changed) {
            console.warn(
              `There are no state updates to method '${
                this[identifierKey]
              }.${key.toString()}' with arguments:`,
              ...args,
            );
          }
          // performance checking
          const executionTime = Date.now() - time!;
          if (executionTime > 100)
            console.warn(
              `The execution time of method '${
                this[identifierKey]
              }.${key.toString()}' is ${executionTime} ms, it's recommended to use 'dispatch' API.`,
            );
          // performance detail: https://immerjs.github.io/immer/docs/performance
        }

        if (changed) {
          this._handleState?.(state);
          const action: Action = {
            type: this[identifierKey],
            method: key,
            params: args,
            _state: state,
            _usm: usm,
            ...(enablePatches
              ? {
                  _patches: patches,
                  _inversePatches: inversePatches,
                }
              : {}),
          };
          if (process.env.NODE_ENV === 'development') {
            const requiredWarning = checkPatches(lastState, action);
            if (requiredWarning) {
              console.warn(
                `The state update operation in the method '${this[
                  identifierKey
                ].toString()}.${key.toString()}'  is a replacement update operation. If there is a performance issue, be sure to use mutation updates to ensure the minimum set of update patches.`,
              );
            }
          }
          this[storeKey].dispatch(action);
        }
      } finally {
        setStagedState(undefined);
        if (process.env.NODE_ENV !== 'production') {
          setStagedModule(undefined);
        }
      }
    } else {
      if (
        process.env.NODE_ENV !== 'production' &&
        getStagedModule() !== this._modulePath
      ) {
        throw new Error(
          `The method '${
            this[identifierKey]
          }.${key.toString()}' is not allowed to call other @action methods in the same module.`,
        );
      }
      // enable staged state mode.
      fn.apply(this, args);
    }
  };
  return {
    ...descriptor,
    value,
  };
};
