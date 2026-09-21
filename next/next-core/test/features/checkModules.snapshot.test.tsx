/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  mockAllLogs,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { sleep } from '@ringcentral-integration/utils';

import {
  action,
  App,
  createSharedApp,
  injectable,
  RcModule,
  RcViewModule,
  state,
} from '../../';
import { waitForMockCallCount } from '../lib/waitForMockCallCount';

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

beforeEach(() => {
  mockAllLogs();
});

@autorun(test)
@title('base checkModules()')
class BaseLifecycle extends Step {
  run() {
    let app: App<CounterView, any, any>;
    let result: any;
    const warnMock = console.warn as jest.Mock;
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
            expect(warnMock.mock.calls).toMatchSnapshot();
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
          desc="call checkModules()"
          action={async () => {
            result = global.checkModules();
          }}
        />
        <Then
          desc="Check the state and result"
          action={() => {
            expect(warnMock.mock.calls).toMatchSnapshot(
              'just warn about Foo._shouldInit',
            );
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

            expect(result).toMatchSnapshot();
          }}
        />
        <When
          desc="init Foo and call checkModules()"
          action={async () => {
            app.instance.counter.foo.init();
            result = global.checkModules();
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={async () => {
            expect(getLifecycleStatus).toHaveBeenCalledTimes(3);
            expect(getLifecycleStatus.mock.calls).toMatchSnapshot();
            expect(result).toMatchSnapshot();
            expect(warnMock.mock.calls).toMatchSnapshot();

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

            expect(result).toMatchSnapshot();
            expect(warnMock.mock.calls).toMatchSnapshot();
          }}
        />
        <When
          desc="reset Foo and call checkModules()"
          action={async () => {
            app.instance.counter.foo.reset();
            result = global.checkModules();
          }}
        />
        <Then
          desc="Check the state and result"
          action={async () => {
            expect(result).toMatchSnapshot();
            expect(warnMock.mock.calls).toMatchSnapshot();
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
            expect(result).toMatchSnapshot();
            expect(warnMock.mock.calls).toMatchSnapshot();
          }}
        />
        <When
          desc="init Foo again and call checkModules()"
          action={async () => {
            app.instance.counter.foo.init();
            result = global.checkModules();
          }}
        />
        <Then
          desc="Check the state and result"
          action={async () => {
            expect(result).toMatchSnapshot();
            expect(warnMock.mock.calls).toMatchSnapshot();
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
            expect(result).toMatchSnapshot();
            expect(warnMock.mock.calls).toMatchSnapshot();
          }}
        />
      </Scenario>
    );
  }
}
