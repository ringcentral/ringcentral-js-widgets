/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { sleep } from '@ringcentral-integration/utils';
import { act, createElement, JSXElementConstructor, ReactElement } from 'react';

import {
  injectable,
  state,
  action,
  createSharedApp,
  RcModule,
  RcViewModule,
  useConnector,
  App,
  render,
  unmountComponentAtNode,
  subscribe,
} from '../..';
import { waitForMockCallCount } from '../lib/waitForMockCallCount';

let componentRenderFn = jest.fn();
let element: Element;

beforeEach(() => {
  componentRenderFn = jest.fn();
  element = document.createElement('div');
  document.body.appendChild(element);
});

afterEach(() => {
  act(() => {
    unmountComponentAtNode(element);
  });
  element.remove();
});

@autorun(test)
@title('create a base app with RcViewModule')
class Base extends Step {
  run() {
    @injectable({
      name: 'Counter',
    })
    class Counter extends RcModule {
      @state
      count = 0;

      @action
      increment() {
        this.count += 1;
      }
    }

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      constructor(public counter: Counter) {
        super();
      }

      component() {
        const count = useConnector(() => this.counter.count);
        componentRenderFn('CounterView', count);
        return null;
      }
    }

    @injectable({
      name: 'AppView',
    })
    class AppView extends RcViewModule {
      constructor(public counterView: CounterView) {
        super();
      }

      component() {
        const count = useConnector(() => this.counterView.counter.count);
        componentRenderFn('AppView', count);
        return createElement(this.counterView.component);
      }
    }
    let app: App<AppView, any, any>;
    return (
      <Scenario desc="Base RcViewModule">
        <Given
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: AppView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render,
            });
          }}
        />
        <When
          desc="Bootstrap app"
          action={async () => {
            expect(componentRenderFn).toHaveBeenCalledTimes(0);
            expect(componentRenderFn).toMatchSnapshot();
            expect(app.instance.counterView.counter.count).toBe(0);
            await act(async () => {
              await app.bootstrap(element);
            });
          }}
        />
        <Then
          desc="Check the render result"
          action={() => {
            expect(app.instance.counterView.counter.count).toBe(0);
            expect(componentRenderFn).toHaveBeenCalledTimes(2);
            expect(componentRenderFn).toMatchSnapshot();
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.counterView.ready).toBeTruthy();
            expect(app.instance.counterView.counter.ready).toBeTruthy();
          }}
        />
        <When
          desc="trigger counter increment"
          action={() => {
            act(() => {
              app.instance.counterView.counter.increment();
            });
          }}
        />
        <Then
          desc="Check the render result"
          action={async () => {
            await waitForRenderReady();
            expect(app.instance.counterView.counter.count).toBe(1);
            expect(componentRenderFn).toHaveBeenCalledTimes(4);
            expect(componentRenderFn).toMatchSnapshot();
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
      name: 'FooView',
    })
    class FooView extends RcViewModule {
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

      component() {
        return null;
      }
    }

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      constructor(public fooView: FooView) {
        super();
      }

      component() {
        return null;
      }
    }

    @injectable({
      name: 'AppView',
    })
    class AppView extends RcViewModule {
      constructor(public counterView: CounterView) {
        super();
        subscribe(this, () => {
          getModuleStatus({
            AppView: this.status,
            CounterView: this.counterView.status,
            FooView: this.counterView.fooView.status,
          });
        });
      }

      component() {
        return null;
      }
    }
    let app: App<AppView, any, any>;
    return (
      <Scenario desc="Base RcViewModule">
        <When
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: AppView,
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

            expect(app.instance.counterView.ready).toBeFalsy();
            expect(app.instance.counterView.initializing).toBeFalsy();
            expect(app.instance.counterView.pending).toBeTruthy();
            expect(app.instance.counterView.resetting).toBeFalsy();

            expect(app.instance.counterView.fooView.ready).toBeFalsy();
            expect(app.instance.counterView.fooView.initializing).toBeFalsy();
            expect(app.instance.counterView.fooView.pending).toBeTruthy();
            expect(app.instance.counterView.fooView.resetting).toBeFalsy();
          }}
        />
        <When
          desc="init fooView"
          action={async () => {
            app.instance.counterView.fooView.init();
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

            expect(app.instance.counterView.ready).toBeTruthy();
            expect(app.instance.counterView.initializing).toBeFalsy();
            expect(app.instance.counterView.pending).toBeFalsy();
            expect(app.instance.counterView.resetting).toBeFalsy();

            expect(app.instance.counterView.fooView.ready).toBeTruthy();
            expect(app.instance.counterView.fooView.initializing).toBeFalsy();
            expect(app.instance.counterView.fooView.pending).toBeFalsy();
            expect(app.instance.counterView.fooView.resetting).toBeFalsy();
          }}
        />
        <When
          desc="reset fooView"
          action={async () => {
            app.instance.counterView.fooView.reset();
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

            expect(app.instance.counterView.ready).toBeFalsy();
            expect(app.instance.counterView.initializing).toBeFalsy();
            expect(app.instance.counterView.pending).toBeTruthy();
            expect(app.instance.counterView.resetting).toBeFalsy();

            expect(app.instance.counterView.fooView.ready).toBeFalsy();
            expect(app.instance.counterView.fooView.initializing).toBeFalsy();
            expect(app.instance.counterView.fooView.pending).toBeTruthy();
            expect(app.instance.counterView.fooView.resetting).toBeFalsy();
          }}
        />
        <When
          desc="init fooView again"
          action={async () => {
            app.instance.counterView.fooView.init();
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

            expect(app.instance.counterView.ready).toBeTruthy();
            expect(app.instance.counterView.initializing).toBeFalsy();
            expect(app.instance.counterView.pending).toBeFalsy();
            expect(app.instance.counterView.resetting).toBeFalsy();

            expect(app.instance.counterView.fooView.ready).toBeTruthy();
            expect(app.instance.counterView.fooView.initializing).toBeFalsy();
            expect(app.instance.counterView.fooView.pending).toBeFalsy();
            expect(app.instance.counterView.fooView.resetting).toBeFalsy();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcViewModule should work with lifecycle APIs')
class BaseLifecycle extends Step {
  run() {
    const getLifecycleStatus = jest.fn();

    @injectable({
      name: 'FooView',
    })
    class FooView extends RcViewModule {
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

      component() {
        return null;
      }
    }

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      constructor(public fooView: FooView) {
        super();
      }

      protected override async onInit() {
        // ensure async logic here
        await sleep(0);
        getLifecycleStatus('CounterView', 'onInit');
      }

      protected override async onReset() {
        // ensure async logic here
        await sleep(0);
        getLifecycleStatus('CounterView', 'onReset');
      }

      protected override async onInitSuccess() {
        // ensure async logic here
        await sleep(0);
        getLifecycleStatus('CounterView', 'onInitSuccess');
      }

      protected override async onInitOnce() {
        // ensure async logic here
        await sleep(0);
        getLifecycleStatus('CounterView', 'onInitOnce');
      }

      component() {
        return null;
      }
    }

    @injectable({
      name: 'AppView',
    })
    class AppView extends RcViewModule {
      constructor(public counterView: CounterView) {
        super();
      }

      protected override onInit() {
        getLifecycleStatus('AppView', 'onInit');
      }

      protected override onReset() {
        getLifecycleStatus('AppView', 'onReset');
      }

      protected override onInitSuccess() {
        getLifecycleStatus('AppView', 'onInitSuccess');
      }

      protected override onInitOnce() {
        getLifecycleStatus('AppView', 'onInitOnce');
      }

      component() {
        return null;
      }
    }
    let app: App<AppView, any, any>;
    return (
      <Scenario desc="Base RcViewModule">
        <When
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: AppView,
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

            expect(app.instance.counterView.ready).toBeFalsy();
            expect(app.instance.counterView.initializing).toBeFalsy();
            expect(app.instance.counterView.pending).toBeTruthy();
            expect(app.instance.counterView.resetting).toBeFalsy();

            expect(app.instance.counterView.fooView.ready).toBeFalsy();
            expect(app.instance.counterView.fooView.initializing).toBeFalsy();
            expect(app.instance.counterView.fooView.pending).toBeTruthy();
            expect(app.instance.counterView.fooView.resetting).toBeFalsy();
          }}
        />
        <When
          desc="init Foo"
          action={async () => {
            app.instance.counterView.fooView.init();
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

            expect(app.instance.counterView.ready).toBeTruthy();
            expect(app.instance.counterView.initializing).toBeFalsy();
            expect(app.instance.counterView.pending).toBeFalsy();
            expect(app.instance.counterView.resetting).toBeFalsy();

            expect(app.instance.counterView.fooView.ready).toBeTruthy();
            expect(app.instance.counterView.fooView.initializing).toBeFalsy();
            expect(app.instance.counterView.fooView.pending).toBeFalsy();
            expect(app.instance.counterView.fooView.resetting).toBeFalsy();
          }}
        />
        <When
          desc="reset Foo"
          action={async () => {
            app.instance.counterView.fooView.reset();
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

            expect(app.instance.counterView.ready).toBeFalsy();
            expect(app.instance.counterView.initializing).toBeFalsy();
            expect(app.instance.counterView.pending).toBeTruthy();
            expect(app.instance.counterView.resetting).toBeFalsy();

            expect(app.instance.counterView.fooView.ready).toBeFalsy();
            expect(app.instance.counterView.fooView.initializing).toBeFalsy();
            expect(app.instance.counterView.fooView.pending).toBeTruthy();
            expect(app.instance.counterView.fooView.resetting).toBeFalsy();
          }}
        />
        <When
          desc="init fooView again"
          action={async () => {
            app.instance.counterView.fooView.init();
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

            expect(app.instance.counterView.ready).toBeTruthy();
            expect(app.instance.counterView.initializing).toBeFalsy();
            expect(app.instance.counterView.pending).toBeFalsy();
            expect(app.instance.counterView.resetting).toBeFalsy();

            expect(app.instance.counterView.fooView.ready).toBeTruthy();
            expect(app.instance.counterView.fooView.initializing).toBeFalsy();
            expect(app.instance.counterView.fooView.pending).toBeFalsy();
            expect(app.instance.counterView.fooView.resetting).toBeFalsy();
          }}
        />
      </Scenario>
    );
  }
}
