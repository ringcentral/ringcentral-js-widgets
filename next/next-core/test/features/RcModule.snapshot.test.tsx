/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { sleep } from '@ringcentral-integration/utils';

import {
  injectable,
  subscribe,
  createSharedApp,
  RcModule,
  RcViewModule,
  App,
  state,
  action,
} from '../..';
import { waitForMockCallCount } from '../lib/waitForMockCallCount';

@autorun(test)
@title('RcModule should work with lifecycle state')
class Base extends Step {
  run() {
    const getModuleStatus = jest.fn();

    @injectable({
      name: 'Foo',
    })
    class Foo extends RcModule {}

    @injectable({
      name: 'Bar',
    })
    class Bar extends RcModule {}

    @injectable({
      name: 'Counter',
    })
    class Counter extends RcModule {
      constructor(public foo: Foo) {
        super();
      }
    }

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      constructor(public counter: Counter, public bar: Bar) {
        super();
        subscribe(this, () => {
          getModuleStatus({
            CounterView: this.status,
            Counter: this.counter.status,
            Foo: this.counter.foo.status,
            Bar: this.bar.status,
          });
        });
      }

      component() {
        return null;
      }
    }
    let app: App<CounterView, any, any>;
    return (
      <Scenario desc="base RcModule">
        <When
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render: () => {
                //
              },
            });
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={() => {
            expect(getModuleStatus).toHaveBeenCalledTimes(11);
            expect(getModuleStatus.mock.calls).toMatchSnapshot();
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeFalsy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.bar.ready).toBeTruthy();
            expect(app.instance.bar.initializing).toBeFalsy();
            expect(app.instance.bar.pending).toBeFalsy();
            expect(app.instance.bar.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeTruthy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeFalsy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeTruthy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeFalsy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcModule should work with Reset action')
class BaseResetModule extends Step {
  run() {
    const getModuleStatus = jest.fn();

    @injectable({
      name: 'Foo',
    })
    class Foo extends RcModule {
      @state
      shouldInit = false;

      @action
      reset() {
        this.shouldInit = false;
      }

      @action
      init() {
        this.shouldInit = true;
      }

      protected override _shouldInit() {
        return super._shouldInit() && this.shouldInit;
      }

      protected override _shouldReset() {
        return !!(super._shouldReset() || (this.ready && !this.shouldInit));
      }
    }

    @injectable({
      name: 'Counter',
    })
    class Counter extends RcModule {
      constructor(public foo: Foo) {
        super();
      }
    }

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      constructor(public counter: Counter) {
        super();
        subscribe(this, () => {
          getModuleStatus({
            CounterView: this.status,
            Counter: this.counter.status,
            Foo: this.counter.foo.status,
          });
        });
      }

      component() {
        return null;
      }
    }
    let app: App<CounterView, any, any>;
    return (
      <Scenario desc="base RcModule">
        <When
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render: () => {
                //
              },
            });
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={() => {
            expect(getModuleStatus).toHaveBeenCalledTimes(3);
            expect(getModuleStatus.mock.calls).toMatchSnapshot();
            expect(app.instance.ready).toBeFalsy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeTruthy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeFalsy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeTruthy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeFalsy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeTruthy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
        <When
          desc="init Foo"
          action={async () => {
            app.instance.counter.foo.init();
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={() => {
            expect(getModuleStatus).toHaveBeenCalledTimes(10);
            expect(getModuleStatus.mock.calls).toMatchSnapshot();
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeFalsy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeTruthy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeFalsy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeTruthy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeFalsy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
        <When
          desc="reset Foo"
          action={async () => {
            app.instance.counter.foo.reset();
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={() => {
            expect(getModuleStatus).toHaveBeenCalledTimes(17);
            expect(getModuleStatus.mock.calls).toMatchSnapshot();
            expect(app.instance.ready).toBeFalsy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeTruthy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeFalsy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeTruthy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeFalsy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeTruthy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
        <When
          desc="init Foo again"
          action={async () => {
            app.instance.counter.foo.init();
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={() => {
            expect(getModuleStatus).toHaveBeenCalledTimes(24);
            expect(getModuleStatus.mock.calls).toMatchSnapshot();
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeFalsy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeTruthy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeFalsy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeTruthy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeFalsy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcModule should work with lifecycle APIs')
class BaseLifecycle extends Step {
  run() {
    const getLifecycleStatus = jest.fn();

    @injectable({
      name: 'Foo',
    })
    class Foo extends RcModule {
      @state
      shouldInit = false;

      @action
      reset() {
        this.shouldInit = false;
      }

      @action
      init() {
        this.shouldInit = true;
      }

      protected override _shouldInit() {
        return super._shouldInit() && this.shouldInit;
      }

      protected override _shouldReset() {
        return !!(super._shouldReset() || (this.ready && !this.shouldInit));
      }

      protected override onInit() {
        getLifecycleStatus('Foo', 'onInit');
      }

      protected override onReset() {
        getLifecycleStatus('Foo', 'onReset');
      }

      protected override onInitSuccess() {
        getLifecycleStatus('Foo', 'onInitSuccess');
      }

      protected override onInitOnce() {
        getLifecycleStatus('Foo', 'onInitOnce');
      }
    }

    @injectable({
      name: 'Counter',
    })
    class Counter extends RcModule {
      constructor(public foo: Foo) {
        super();
      }

      protected override async onInit() {
        // ensure async logic here
        await sleep(0);
        getLifecycleStatus('Counter', 'onInit');
      }

      protected override async onReset() {
        // ensure async logic here
        await sleep(0);
        getLifecycleStatus('Counter', 'onReset');
      }

      protected override async onInitSuccess() {
        // ensure async logic here
        await sleep(0);
        getLifecycleStatus('Counter', 'onInitSuccess');
      }

      protected override async onInitOnce() {
        // ensure async logic here
        await sleep(0);
        getLifecycleStatus('Counter', 'onInitOnce');
      }
    }

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      constructor(public counter: Counter) {
        super();
      }

      protected override onInit() {
        getLifecycleStatus('CounterView', 'onInit');
      }

      protected override onReset() {
        getLifecycleStatus('CounterView', 'onReset');
      }

      protected override onInitSuccess() {
        getLifecycleStatus('CounterView', 'onInitSuccess');
      }

      protected override onInitOnce() {
        getLifecycleStatus('CounterView', 'onInitOnce');
      }

      component() {
        return null;
      }
    }
    let app: App<CounterView, any, any>;
    return (
      <Scenario desc="base RcModule">
        <When
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render: () => {
                //
              },
            });
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={() => {
            expect(getLifecycleStatus).toHaveBeenCalledTimes(0);
            expect(getLifecycleStatus.mock.calls).toMatchSnapshot();
            expect(app.instance.ready).toBeFalsy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeTruthy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeFalsy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeTruthy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeFalsy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeTruthy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
        <When
          desc="init Foo"
          action={async () => {
            app.instance.counter.foo.init();
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={async () => {
            expect(getLifecycleStatus).toHaveBeenCalledTimes(3);
            expect(getLifecycleStatus.mock.calls).toMatchSnapshot();

            // wait for async logic to finish(onInitOnce/onInit/onInitSuccess in counter and counterView)
            await waitForMockCallCount(getLifecycleStatus, 9);
            expect(getLifecycleStatus.mock.calls).toMatchSnapshot();

            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeFalsy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeTruthy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeFalsy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeTruthy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeFalsy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
        <When
          desc="reset Foo"
          action={async () => {
            app.instance.counter.foo.reset();
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={async () => {
            expect(getLifecycleStatus).toHaveBeenCalledTimes(11);
            expect(getLifecycleStatus.mock.calls).toMatchSnapshot();

            // wait for async logic to finish in onReset in Foo
            await waitForMockCallCount(getLifecycleStatus, 12);
            expect(getLifecycleStatus.mock.calls).toMatchSnapshot();

            expect(app.instance.ready).toBeFalsy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeTruthy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeFalsy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeTruthy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeFalsy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeTruthy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
        <When
          desc="init Foo again"
          action={async () => {
            app.instance.counter.foo.init();
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={async () => {
            expect(getLifecycleStatus).toHaveBeenCalledTimes(14);
            expect(getLifecycleStatus.mock.calls).toMatchSnapshot();

            // wait for async logic to finish(onInit/onInitSuccess in counter and counterView)
            await waitForMockCallCount(getLifecycleStatus, 18);
            expect(getLifecycleStatus.mock.calls).toMatchSnapshot();

            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeFalsy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.counter.ready).toBeTruthy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeFalsy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeTruthy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeFalsy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcModule should work with _ignoreModuleReadiness')
class BaseIgnoreModuleReadiness extends Step {
  run() {
    const getModuleStatus = jest.fn();

    @injectable({
      name: 'Foo',
    })
    class Foo extends RcModule {
      shouldInit = false;

      protected override _shouldInit() {
        return super._shouldInit() && this.shouldInit;
      }

      protected override _shouldReset() {
        return !!(super._shouldReset() || (this.ready && !this.shouldInit));
      }
    }

    @injectable({
      name: 'Counter',
    })
    class Counter extends RcModule {
      constructor(public foo: Foo) {
        super();
        this._ignoreModuleReadiness(this.foo);
      }
    }

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      constructor(public counter: Counter, public foo: Foo) {
        super();
        subscribe(this, () => {
          getModuleStatus({
            CounterView: this.status,
            Counter: this.counter.status,
            Foo: this.counter.foo.status,
          });
        });
      }

      component() {
        return null;
      }
    }
    let app: App<CounterView, any, any>;
    return (
      <Scenario desc="base RcModule">
        <When
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render: () => {
                //
              },
            });
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={() => {
            expect(getModuleStatus).toHaveBeenCalledTimes(5);
            expect(getModuleStatus.mock.calls).toMatchSnapshot();
            expect(app.instance.ready).toBeFalsy();
            expect(app.instance.initializing).toBeFalsy();
            expect(app.instance.pending).toBeTruthy();
            expect(app.instance.resetting).toBeFalsy();

            expect(app.instance.foo.ready).toBeFalsy();
            expect(app.instance.foo.initializing).toBeFalsy();
            expect(app.instance.foo.pending).toBeTruthy();
            expect(app.instance.foo.resetting).toBeFalsy();

            // only counter is ready
            expect(app.instance.counter.ready).toBeTruthy();
            expect(app.instance.counter.initializing).toBeFalsy();
            expect(app.instance.counter.pending).toBeFalsy();
            expect(app.instance.counter.resetting).toBeFalsy();

            expect(app.instance.counter.foo.ready).toBeFalsy();
            expect(app.instance.counter.foo.initializing).toBeFalsy();
            expect(app.instance.counter.foo.pending).toBeTruthy();
            expect(app.instance.counter.foo.resetting).toBeFalsy();
          }}
        />
      </Scenario>
    );
  }
}
