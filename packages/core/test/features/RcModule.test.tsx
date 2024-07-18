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
import type { Reducer } from 'redux';

import {
  RcModuleV2,
  state,
  storage,
  globalStorage,
  globalStorageStateKey,
  storageStateKey,
} from '../../lib/RcModule';

@autorun(test)
@title('RcModuleV2::addModule compatibility check')
class AddModuleCompatibilityCheck extends Step {
  run() {
    return (
      <Scenario desc="RcModuleV2::addModule compatibility features">
        <Given
          desc="Generic RcModuleV2 instance fooInstance of class Foo"
          action={(props: any, context: any) => {
            context.Foo = class Foo extends RcModuleV2 {};
            context.fooInstance = new context.Foo();
          }}
        />
        <And
          desc="Generic RcModuleV2 instance barInstance of class Bar"
          action={(props: any, context: any) => {
            context.Bar = class Bar extends RcModuleV2 {};
            context.barInstance = new context.Bar();
          }}
        />
        <When
          desc="barInstance is added as sub module 'bar' to fooInstance"
          action={(props: any, context: any) => {
            expect(typeof context.fooInstance.addModule).toBe('function');
            context.fooInstance.addModule('bar', context.barInstance);
          }}
        />
        <Then
          desc="barInstance should be accessible through fooInstance as 'bar' property"
          action={(props: any, context: any) => {
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
          action={(props: any, context: any) => {
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
          action={(props: any, context: any) => {
            expect(context.barInstance.modulePath).toBe('root.bar');
          }}
        />
        <When
          desc="barInstance is added as a sub module with a different name 'bar2'"
          action={(props: any, context: any) => {
            context.fooInstance.addModule('bar2', context.barInstance);
          }}
        />
        <Then
          desc="barInstance should be accessible through 'bar2' property"
          action={(props: any, context: any) => {
            expect(context.fooInstance.bar2).toBe(context.barInstance);
          }}
        />
        <And
          desc="modulePath of barInstance should still be 'root.bar'"
          action={(props: any, context: any) => {
            expect(context.barInstance.modulePath).toBe('root.bar');
          }}
        />
      </Scenario>
    );
  }
}

/* reducer related tests */

function createStatefulModuleFoo(props: any, context: any) {
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
  _key?: string;
  _reducer?: Reducer;
  registerReducer({ key, reducer }: { key: string; reducer: Reducer }) {
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

function createStorageInstances(props: any, context: any) {
  context.storageInstance = new MockStorage();
  context.globalStorageInstance = new MockStorage();
}

function getType(isGlobal: boolean) {
  return isGlobal ? 'globalStorage' : 'storage';
}

@autorun(test)
@title('RcModuleV2 storage reducer compatibility')
class StateCombineStorageReducers extends Step {
  @examples(`
    | isGlobal | enableCache | hasStorage |
    | false    | false       | false      |
    | false    | true        | false      |
    | false    | false       | true       |
    | false    | true        | true       |
    | true     | false       | false      |
    | true     | true        | false      |
    | true     | false       | true       |
    | true     | true        | true       |
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
          action={(props: any, context: any) => {
            const {
              Foo,
              example: { isGlobal, enableCache, hasStorage },
            } = context;
            const type = getType(isGlobal);
            const deps: ModulesType = {};
            if (hasStorage) {
              deps[type] = context[`${type}Instance`];
            }
            context.fooInstance = new Foo({
              deps,
              [`enable${isGlobal ? 'Global' : ''}Cache`]: enableCache,
              storageKey: 'fooStorageKey',
            });
            context.enableStorage =
              !!context.fooInstance[
                isGlobal ? globalStorageStateKey : storageStateKey
              ].length;
            expect(context.enableStorage).toBe(enableCache && hasStorage);
          }}
        />
        <Then
          desc="fooInstance should combine storage states to normal state when storage is not enabled"
          action={(props: any, context: any) => {
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
            if (context.enableStorage) {
              expect(state[`${type}Counter`]).toBeUndefined();
              expect(context[`${type}Instance`]._key).toBeDefined();
              expect(context[`${type}Instance`]._reducer).toBeDefined();
              const storageState = context[`${type}Instance`]._reducer(
                undefined,
                { type: 'INIT' },
              );
              expect(storageState).toBeDefined();
            } else {
              expect(state[`${type}Counter`]).toBeDefined();
            }
          }}
        />
        <And
          desc="fooInstance should combine storage states to normal state when storage is not enabled"
          action={(props: any, context: any) => {
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
            if (context.enableStorage) {
              expect(state[`${type}Counter`]).toBeUndefined();
              expect(context[`${type}Instance`]._key).toBeDefined();
              expect(context[`${type}Instance`]._reducer).toBeDefined();
              const storageState = context[`${type}Instance`]._reducer(
                undefined,
                { type: 'INIT' },
              );
              expect(storageState).toBeDefined();
            } else {
              expect(state[`${type}Counter`]).toBeDefined();
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcModuleV2 storage unexpected usage check')
class StorageUnexpectedUsageCheck extends Step {
  run() {
    let createModule: () => void;
    return (
      <Scenario desc="RcModuleV2 storage unexpected usage check">
        <When
          desc="create Foo without @state"
          action={() => {
            createModule = () => {
              class Foo extends RcModuleV2 {
                @storage
                storageCounter = 0;
              }
            };
          }}
        />
        <Then
          desc="It should throw check error"
          action={() => {
            expect(createModule).toThrow();
          }}
        />
        <When
          desc="create Bar without @state"
          action={() => {
            createModule = () => {
              class Bar extends RcModuleV2 {
                @globalStorage
                globalStorageCounter = 0;
              }
            };
          }}
        />
        <Then
          desc="It should throw check error"
          action={() => {
            expect(createModule).toThrow();
          }}
        />
      </Scenario>
    );
  }
}
