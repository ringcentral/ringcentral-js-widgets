/* eslint-disable func-names */
import { produceWithPatches } from 'immer';
import { createSelector } from 'reselect';
import { event, Event } from '../usm';
import Module from './core/module';

interface Descriptor<T> extends TypedPropertyDescriptor<T> {
  initializer(): T;
}

/**
 * `@state` is used to decorate a module state, which is based on the Redux reducer.
 */
function state(
  target: Module,
  name: string,
  descriptor?: Descriptor<unknown>,
): any {
  target._actionTypes = [...(target._actionTypes || []), name];
  target._reducersMaps = {
    ...(target._reducersMaps || {}),
  };
  target._initialValue = {
    ...(target._initialValue || {}),
  };
  target._initialValue[name] =
    descriptor && descriptor.initializer
      ? descriptor.initializer.call(target)
      : undefined;
  const get = function (this: Module) {
    return this._store ? this.state[name] : this._initialValue[name];
  };
  const set = function (this: Module, value: unknown) {
    if (this._store) {
      this.state[name] = value;
    } else {
      // Support for synchronous updating of initialized state values while in the constructor.
      this._initialValue[name] = value;
    }
  };
  return {
    enumerable: true,
    configurable: true,
    get,
    set,
  };
}

/**
 * `@action` is used to decorate a method that changes the state of the module (Executing it will dispatch a Redux action),
 * and it does **NOT** support asynchronous methods.
 */
function action(
  target: Module,
  name: string,
  descriptor: TypedPropertyDescriptor<(...args: any) => void>,
) {
  const fn = descriptor.value;
  descriptor.value = function (this: Module, ...args: []) {
    const originalState: Record<string, any> = this.state;
    const [states, patches] = produceWithPatches(
      originalState,
      (state: any) => {
        this.__$$state$$__ = state;
        fn.call(this, ...args);
      },
    );
    this.__$$state$$__ = undefined;
    this._dispatch({
      type: Object.keys(this.state).map(
        (key) => (this.actionTypes as Record<string, string>)[key],
      ),
      states,
      patches,
      __name__: this.__name__,
    });
  };
  return descriptor;
}

function reducer(
  target: Module,
  name: string,
  descriptor: TypedPropertyDescriptor<any>,
) {
  const fn = descriptor.value;
  descriptor.value = function (this: Module, ...args: []) {
    const states = fn.apply(this, [...args, this.state]);
    this._dispatch({
      type: Object.keys(this.state).map(
        (key) => (this.actionTypes as Record<string, string>)[key],
      ),
      states,
    });
  };
  return descriptor;
}

const WRAPPER = '__selectors__';

/**
 * Use `@computed(callback)`, you should make sure that the return value of its callback function is an `Array` of dependency collections.
 */
function computed(target: Module, name: string, descriptor?: Descriptor<any>) {
  if (descriptor && typeof descriptor.initializer !== 'function') {
    throw new Error(
      `${name} must be used in properties setter value with Array type`,
    );
  }
  return {
    configurable: true,
    enumerable: true,
    get<T extends Module>(this: T) {
      if (!this[WRAPPER]) {
        this[WRAPPER] = {};
      }
      if (!this[WRAPPER][name] && descriptor) {
        const _selector = descriptor.initializer.call(this);
        const selector = createSelector(
          _selector.slice(0, -1),
          _selector.slice(-1)[0],
        );
        this[WRAPPER][name] = () => selector(this.state);
      }
      return this[WRAPPER][name]();
    },
  };
}

export { Module as default, state, action, reducer, computed, event, Event };
