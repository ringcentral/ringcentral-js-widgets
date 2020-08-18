import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  And,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import { RcModuleV2, state, storage, globalStorage } from '../../lib/RcModule';

@autorun(test)
@title('RcModuleV2::addModule compatibility check')
class AddModuleCompatibilityCheck extends Step {
  run() {
    return (
      <Scenario desc="RcModuleV2::addModule compatibility features">
        <Given
          desc="Generic RcModuleV2 instance fooInstance of class Foo"
          action={(props, context) => {
            context.Foo = class Foo extends RcModuleV2 {};
            context.fooInstance = new context.Foo();
          }}
        />
        <And
          desc="Generic RcModuleV2 instance barInstance of class Bar"
          action={(props, context) => {
            context.Bar = class Bar extends RcModuleV2 {};
            context.barInstance = new context.Bar();
          }}
        />
        <When
          desc="barInstance is added as sub module 'bar' to fooInstance"
          action={(props, context) => {
            expect(typeof context.fooInstance.addModule).toBe('function');
            context.fooInstance.addModule('bar', context.barInstance);
          }}
        />
        <Then
          desc="barInstance should be accessible through fooInstance as 'bar' property"
          action={(props, context) => {
            expect(context.fooInstance.bar).toBe(context.barInstance);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcModuleV2::addModule redundancy check')
class AddModuleRedundancyCheck extends Step {
  run() {
    return (
      <Scenario desc="RcModuleV2::addModule redundancy check">
        <Given
          desc="Generic RcModuleV2 fooInstance and its sub module barInstance"
          action={AddModuleCompatibilityCheck}
        />
        <Then
          desc="Trying to add another sub module 'bar' to fooInstance should throw error"
          action={(props, context) => {
            expect(() => {
              context.fooInstance.addModule('bar', {});
            }).toThrow();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcModuleV2::addModule modulePath check')
class AddModuleModulePathCheck extends Step {
  run() {
    return (
      <Scenario desc="RcModuleV2::addModule modulePath check">
        <Given
          desc="Generic RcModuleV2 fooInstance and its sub module barInstance"
          action={AddModuleCompatibilityCheck}
        />
        <Then
          desc="barInstance.modulePath should be set to 'root.bar'"
          action={(props, context) => {
            expect(context.barInstance.modulePath).toBe('root.bar');
          }}
        />
        <When
          desc="barInstance is added as a sub module with a different name 'bar2'"
          action={(props, context) => {
            context.fooInstance.addModule('bar2', context.barInstance);
          }}
        />
        <Then
          desc="barInstance should be accessible through 'bar2' property"
          action={(props, context) => {
            expect(context.fooInstance.bar2).toBe(context.barInstance);
          }}
        />
        <And
          desc="modulePath of barInstance should still be 'root.bar'"
          action={(props, context) => {
            expect(context.barInstance.modulePath).toBe('root.bar');
          }}
        />
      </Scenario>
    );
  }
}

/* reducer related tests */

function createStatefulModuleFoo(props, context) {
  class Foo extends RcModuleV2 {
    @state
    counter = 0;

    @storage
    @state
    storageCounter = 0;

    @globalStorage
    @state
    globalStorageCounter = 0;
  }

  context.Foo = Foo;
}

class MockStorage {
  _key: string;
  _reducer: (any) => any;
  registerReducer({ key, reducer }) {
    this._key = key;
    this._reducer = reducer;
  }

  getItem() {
    return {};
  }
}

interface ModulesType {
  storage?: MockStorage;
  globalStorage?: MockStorage;
}

function createStorageInstances(props, context) {
  context.storageInstance = new MockStorage();
  context.globalStorageInstance = new MockStorage();
}

function capitalize(str: string) {
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`;
}

function getType(isGlobal) {
  return isGlobal ? 'globalStorage' : 'storage';
}

@autorun(test)
@title('RcModuleV2 storage reducer compatibility')
class StateCombineStorageReducers extends Step {
  @examples(`
    | isGlobal | enableCache | hasStorage|
    | false    | false       | false     |
    | false    | true        | false     |
    | false    | false       | true      |
    | false    | true        | true      |
    | true     | false       | false     |
    | true     | true        | false     |
    | true     | false       | true      |
    | true     | true        | true      |
  `)
  run() {
    return (
      <Scenario desc="RcModuleV2::state combine storage reducers when not enabled">
        <Given desc="Stateful module Foo" action={createStatefulModuleFoo} />
        <Given
          desc="storage instances in context"
          action={createStorageInstances}
        />
        <When
          desc="Create instance with storage isGlobal = ${isGlobal}, enableCache = ${enableCache} and hasStorage = ${hasStorage}"
          action={(props, context) => {
            const {
              Foo,
              example: { isGlobal, enableCache, hasStorage },
            } = context;
            const type = getType(isGlobal);
            const modules: ModulesType = {};
            if (hasStorage) {
              modules[type] = context[`${type}Instance`];
            }
            context.fooInstance = new Foo({
              modules,
              [`enable${isGlobal ? 'Global' : ''}Cache`]: enableCache,
              storageKey: 'fooStorageKey',
            });
            expect(context.fooInstance[`enable${capitalize(type)}`]).toBe(
              enableCache && hasStorage,
            );
          }}
        />
        <Then
          desc="fooInstance should combine storage states to normal state when storage is not enabled"
          action={(props, context) => {
            const {
              fooInstance,
              example: { isGlobal },
            } = context;
            const state = fooInstance.reducer(
              {},
              {
                type: 'INIT',
              },
            );
            const type = getType(isGlobal);
            if (fooInstance[`enable${capitalize(type)}`]) {
              expect(state[`${type}Counter`]).toBeUndefined();
              expect(context[`${type}Instance`]._key).toBeDefined();
              expect(context[`${type}Instance`]._reducer).toBeDefined();
              const storageState = context[`${type}Instance`]._reducer(
                {},
                { type: 'INIT' },
              );
              expect(storageState[`${type}Counter`]).toBeDefined();
            } else {
              expect(state[`${type}Counter`]).toBeDefined();
            }
          }}
        />
        <And
          desc="fooInstance should combine storage states to normal state when storage is not enabled"
          action={(props, context) => {
            const {
              fooInstance,
              example: { isGlobal },
            } = context;
            const state = fooInstance.reducer(
              {},
              {
                type: 'INIT',
              },
            );
            const type = getType(isGlobal);
            if (fooInstance[`enable${capitalize(type)}`]) {
              expect(state[`${type}Counter`]).toBeUndefined();
              expect(context[`${type}Instance`]._key).toBeDefined();
              expect(context[`${type}Instance`]._reducer).toBeDefined();
              const storageState = context[`${type}Instance`]._reducer(
                {},
                { type: 'INIT' },
              );
              expect(storageState[`${type}Counter`]).toBeDefined();
            } else {
              expect(state[`${type}Counter`]).toBeDefined();
            }
          }}
        />
      </Scenario>
    );
  }
}
