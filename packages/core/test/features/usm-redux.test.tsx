import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { applyPatches } from 'immer';
import { applyMiddleware } from 'redux';
import {
  createStore,
  action,
  state,
  computed,
  watch,
  subscribe,
  Store,
} from '../../lib/usm-redux/index';

@autorun(test)
@title('createStore::basic')
export class CreateStoreBasic extends Step {
  run() {
    class Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }
    const fn = jest.fn();
    let counter: Counter;
    let store: Store;
    let oldState: any;
    return (
      <Scenario desc="">
        <Given
          desc="create instance and create store"
          action={() => {
            counter = new Counter();
            store = createStore({
              modules: [
                counter,
                '',
                'test',
                null,
                undefined,
                0,
                42,
                NaN,
                Symbol('test'),
                Symbol.for('test'),
                false,
                true,
              ],
            });
            [oldState] = Object.values(store.getState());
            expect(oldState).toEqual({ count: { sum: 0 } });
            store.subscribe(() => {
              fn();
            });
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="count in counter should be updated"
          action={() => {
            const [newState] = Object.values(store.getState());
            expect(newState).toEqual({ count: { sum: 1 } });
            expect(fn.mock.calls.length).toBe(1);
            expect(newState === oldState).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('enablePatches::basic')
export class EnablePatchesBasic extends Step {
  run() {
    class Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }
    const snapshots: Record<string, any>[] = [];
    let counter: Counter;
    return (
      <Scenario desc="">
        <Given
          desc="create instance and create store with 'enablePatches: true'"
          action={() => {
            counter = new Counter();
            createStore(
              {
                modules: [counter],
              },
              undefined,
              {
                enablePatches: true,
                reduxEnhancer: applyMiddleware(
                  ({ getState }) => (next) => (action) => {
                    const lastState: any = getState();
                    const result = next(action);
                    snapshots.push(applyPatches(lastState, action._patches));
                    return result;
                  },
                ),
              },
            );
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="snapshots should be updated and expected"
          action={() => {
            expect(Object.values(snapshots[0])).toEqual([
              { count: { sum: 1 } },
            ]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('action::Single')
export class ActionSingle extends Step {
  run() {
    class Counter {
      @state
      count = { sum: 0 };
    }
    class Foo {
      constructor(public counter: Counter) {}

      @action
      increase() {
        this.counter.count.sum += 1;
      }
    }

    let counter: Counter;
    let foo: Foo;
    let store: Store;
    const fn = jest.fn();
    return (
      <Scenario desc="">
        <Given
          desc="create instances and create store"
          action={() => {
            counter = new Counter();
            foo = new Foo(counter);

            store = createStore({
              modules: [counter, foo],
            });

            const oldState = Object.values(store.getState())[0] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
            store.subscribe(() => {
              fn();
            });
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            foo.increase();
          }}
        />
        <Then
          desc="count in counter should be updated from state tree"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 1 });
            expect(fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('createStore::strict')
export class CreateStoreStrict extends Step {
  run() {
    class Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    let counter: Counter;
    let store: Store;
    const fn = jest.fn();
    return (
      <Scenario desc="">
        <Given
          desc="create instance and create store with 'strict: true'"
          action={() => {
            counter = new Counter();

            store = createStore({
              modules: [counter],
              strict: true,
            });
            const oldState = Object.values(store.getState())[0] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
            store.subscribe(() => {
              fn();
            });
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="count in counter should be updated"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 1 });
            expect(fn.mock.calls.length).toBe(1);
          }}
        />
        <When
          desc="catch error without @action update state"
          action={() => {
            expect(() => {
              counter.count.sum += 1;
            }).toThrow();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('computed::basic')
export class ComputedBasic extends Step {
  run() {
    const computedFn = jest.fn();
    class Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }

      @computed(({ count }: Counter) => [count.sum])
      get sum() {
        computedFn();
        return this.count.sum + 1;
      }
    }

    let counter: Counter;
    let store: Store;
    const fn = jest.fn();
    return (
      <Scenario desc="">
        <Given
          desc="create instances and create store"
          action={() => {
            counter = new Counter();

            store = createStore({
              modules: [counter],
            });

            const oldState = Object.values(store.getState())[0] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
            store.subscribe(() => {
              fn();
            });
            expect(computedFn.mock.calls.length).toBe(0);
            expect(counter.sum).toBe(1);
            expect(counter.sum).toBe(1);
            expect(computedFn.mock.calls.length).toBe(1);
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="count in counter should be updated and 'computed' should be effective"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 1 });
            expect(fn.mock.calls.length).toBe(1);
            expect(computedFn.mock.calls.length).toBe(1);
            expect(counter.sum).toBe(2);
            expect(counter.sum).toBe(2);
            expect(computedFn.mock.calls.length).toBe(2);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('computed::multi-deps')
export class ComputedMultiDeps extends Step {
  run() {
    const computedFn = jest.fn();
    class Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    class Foo {
      constructor(public counter: Counter) {}

      @state
      count = 0;

      @action
      increase() {
        this.count += 1;
      }

      @state
      count1 = 0;

      @action
      increase1() {
        this.count1 += 1;
      }

      @computed(({ counter, count }: Foo) => [counter.count.sum, count])
      get sum() {
        computedFn();
        return this.counter.count.sum + this.count;
      }
    }
    let counter: Counter;
    let foo: Foo;
    let store: Store;
    const fn = jest.fn();
    return (
      <Scenario desc="">
        <Given
          desc="create instances and create store"
          action={() => {
            counter = new Counter();
            foo = new Foo(counter);

            store = createStore({
              modules: [counter, foo],
            });

            expect(foo.sum).toBe(0);
            expect(foo.sum).toBe(0);
            expect(computedFn.mock.calls.length).toBe(1);
            store.subscribe(() => {
              fn();
            });
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="count in counter should be updated and 'computed' should be effective"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 1 });
            expect(fn.mock.calls.length).toBe(1);
            expect(foo.sum).toBe(1);
            expect(computedFn.mock.calls.length).toBe(2);
            expect(foo.sum).toBe(1);
            expect(computedFn.mock.calls.length).toBe(2);
          }}
        />
        <When
          desc="call foo 'increase'"
          action={() => {
            foo.increase();
          }}
        />
        <Then
          desc="count in foo should be updated and 'computed' should be effective"
          action={() => {
            const newState = Object.values(store.getState())[1] as Foo;
            expect(newState.count).toBe(1);
            expect(fn.mock.calls.length).toBe(2);
            expect(foo.sum).toBe(2);
            expect(computedFn.mock.calls.length).toBe(3);
            expect(foo.sum).toBe(2);
            expect(computedFn.mock.calls.length).toBe(3);
          }}
        />
        <When
          desc="call foo 'increase1'"
          action={() => {
            foo.increase1();
          }}
        />
        <Then
          desc="No dependent computed count1 in foo should be updated and 'computed' should be effective"
          action={() => {
            const newState = Object.values(store.getState())[1] as Foo;
            expect(newState.count1).toBe(1);
            expect(fn.mock.calls.length).toBe(3);
            expect(foo.sum).toBe(2);
            expect(computedFn.mock.calls.length).toBe(3);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('createStore::multi-instance')
export class CreateStoreMultiInstance extends Step {
  run() {
    class Counter {
      name = 'counter';

      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }
    let counter: Counter;
    let counter1: Counter;
    let store: Store;
    const fn = jest.fn();
    return (
      <Scenario desc="">
        <Given
          desc="create instances and create store"
          action={() => {
            counter = new Counter();
            counter1 = new Counter();

            store = createStore({
              modules: [counter, counter1],
            });

            const oldState = Object.values(store.getState())[1] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
            expect(Object.keys(store.getState())[1]).toBe('counter1');
            expect(counter1.name).toBe('counter');
            expect(counter.name).toBe('counter');
            store.subscribe(() => {
              fn();
            });
          }}
        />
        <When
          desc="call counter1 'increase'"
          action={() => {
            counter1.increase();
          }}
        />
        <Then
          desc="count in counter1 should be updated and count in counter should not have been updated"
          action={() => {
            const newState = Object.values(store.getState())[1] as Counter;
            expect(newState.count).toEqual({ sum: 1 });
            expect(counter1.count).toEqual({ sum: 1 });
            expect(counter.count).toEqual({ sum: 0 });
            expect(fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('createStore::preloadedState')
export class CreateStorePreloadedState extends Step {
  run() {
    class Counter {
      name = 'counter';

      @state
      count = { sum: 0 };

      @state
      count1 = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    let counter: Counter;
    let store: Store;
    return (
      <Scenario desc="">
        <Given
          desc="create instances"
          action={() => {
            counter = new Counter();
          }}
        />
        <When
          desc="create store with preloadedState"
          action={() => {
            store = createStore(
              {
                modules: [counter],
              },
              {
                counter: {
                  count: {
                    sum: 10,
                  },
                },
              },
            );
          }}
        />
        <Then
          desc="new state should be updated with preloadedState"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 10 });
            expect(newState.count1).toEqual({ sum: 0 });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('subscribe::basic')
export class SubscribeBasic extends Step {
  run() {
    const fn = jest.fn();
    class Counter {
      constructor() {
        subscribe(this, () => {
          fn();
        });
      }

      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    let counter: Counter;
    let store: Store;
    return (
      <Scenario desc="">
        <Given
          desc="create instances and create store"
          action={() => {
            counter = new Counter();

            store = createStore({
              modules: [counter],
            });

            const oldState = Object.values(store.getState())[0] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
            expect(fn.mock.calls.length).toBe(0);
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="count in counter should be updated and 'subscribe' should be triggered"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 1 });
            expect(fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('watch::basic')
export class WatchBasic extends Step {
  run() {
    const fn = jest.fn();
    class Counter {
      constructor() {
        watch(
          this,
          () => this.count.sum,
          (...args) => {
            fn(...args);
          },
        );
      }

      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }
    let counter: Counter;
    let store: Store;
    return (
      <Scenario desc="">
        <Given
          desc="create instances and create store"
          action={() => {
            counter = new Counter();

            store = createStore({
              modules: [counter],
            });

            const oldState = Object.values(store.getState())[0] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="count in counter should be updated and 'watch' should be triggered"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 1 });
            expect(fn.mock.calls).toEqual([[1, 0]]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('createStore::inheritance')
export class CreateStoreInheritance extends Step {
  run() {
    class Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    class Counter1 extends Counter {
      @state
      counter1 = 0;

      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    class Counter2 extends Counter {
      @state
      counter2 = 0;

      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    let counter: Counter;
    let counter0: Counter;
    let counter1: Counter1;
    let counter2: Counter2;
    let store: Store;
    return (
      <Scenario desc="">
        <Given
          desc="create multiple instances with Multiple inheritance and create store"
          action={() => {
            counter = new Counter();
            counter0 = new Counter();
            counter1 = new Counter1();
            counter2 = new Counter2();

            store = createStore({
              modules: [counter, counter0, counter1, counter2],
            });
            const oldState = Object.values(store.getState())[0] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
          }}
        />
        <When
          desc="call counter 'increase'"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="state should be expected"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 1 });
            const newState1 = Object.values(store.getState())[1] as Counter;
            expect(newState1.count).toEqual({ sum: 0 });
            const newState2 = Object.values(store.getState())[2] as Counter1;
            expect(newState2.count).toEqual({ sum: 0 });
            expect(newState2.counter1).toEqual(0);
            expect(
              Object.prototype.hasOwnProperty.call(newState2, 'counter2'),
            ).toBeFalsy();
            const newState3 = Object.values(store.getState())[3] as Counter2;
            expect(newState3.count).toEqual({ sum: 0 });
            expect(newState3.counter2).toEqual(0);
            expect(
              Object.prototype.hasOwnProperty.call(newState3, 'counter1'),
            ).toBeFalsy();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('createStore::inheritance::super')
export class CreateStoreInheritanceSuper extends Step {
  run() {
    class Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    class Counter1 extends Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 1;
      }
    }

    class Counter2 extends Counter {
      @state
      count = { sum: 0 };

      @action
      increase() {
        super.increase();
        this.count.sum += 1;
      }
    }
    let counter: Counter;
    let counter0: Counter;
    let counter1: Counter1;
    let counter2: Counter2;
    let store: Store;
    const fn = jest.fn();
    return (
      <Scenario desc="">
        <Given
          desc="create instances and create store"
          action={() => {
            counter = new Counter();
            counter0 = new Counter();
            counter1 = new Counter1();
            counter2 = new Counter2();

            store = createStore({
              modules: [counter, counter0, counter1, counter2],
            });
            const oldState = Object.values(store.getState())[0] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
            const oldState1 = Object.values(store.getState())[0] as Counter;
            expect(oldState1.count).toEqual({ sum: 0 });
            const oldState2 = Object.values(store.getState())[0] as Counter1;
            expect(oldState2.count).toEqual({ sum: 0 });
            const oldState3 = Object.values(store.getState())[0] as Counter2;
            expect(oldState3.count).toEqual({ sum: 0 });
            store.subscribe(() => {
              fn();
            });
          }}
        />
        <When
          desc="call counter2 'increase'"
          action={() => {
            counter2.increase();
          }}
        />
        <Then
          desc="state should be expected"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            expect(newState.count).toEqual({ sum: 0 });
            const newState1 = Object.values(store.getState())[1] as Counter;
            expect(newState1.count).toEqual({ sum: 0 });
            const newState2 = Object.values(store.getState())[2] as Counter1;
            expect(newState2.count).toEqual({ sum: 0 });
            const newState3 = Object.values(store.getState())[3] as Counter2;
            expect(newState3.count).toEqual({ sum: 2 });
            expect(fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('createStore::cross')
export class CreateStoreCross extends Step {
  run() {
    class Counter0 {
      @state
      count = { sum: 0 };

      @action
      increase() {
        this.count.sum += 2;
      }
    }

    class Counter {
      constructor(public counter: Counter0) {}

      @state
      count = { sum: 0 };

      @state
      list: number[] = [];

      @action
      increase() {
        this.counter.increase();
        this.count.sum += 1;
        this.list.push(this.count.sum);
      }
    }
    let counter0: Counter0;
    let counter: Counter;
    let store: Store;
    const fn = jest.fn();
    return (
      <Scenario desc="">
        <Given
          desc="create instances and create store"
          action={() => {
            counter0 = new Counter0();
            counter = new Counter(counter0);

            store = createStore({
              modules: [counter, counter0],
            });

            const oldState = Object.values(store.getState())[0] as Counter;
            expect(oldState.count).toEqual({ sum: 0 });
            store.subscribe(() => {
              fn();
            });
          }}
        />
        <When
          desc="call counter 'increase' with cross-action and cross-module"
          action={() => {
            counter.increase();
          }}
        />
        <Then
          desc="state should be updated and dispatch once"
          action={() => {
            const newState = Object.values(store.getState())[0] as Counter;
            const newState1 = Object.values(store.getState())[1] as Counter0;
            expect(newState.count).toEqual({ sum: 1 });
            expect(counter.count).toEqual({ sum: 1 });
            expect(newState.list).toEqual([1]);
            expect(counter.list).toEqual([1]);
            expect(newState1.count).toEqual({ sum: 2 });
            expect(counter0.count).toEqual({ sum: 2 });
            expect(fn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}
