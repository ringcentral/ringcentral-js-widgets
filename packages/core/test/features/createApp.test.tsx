import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { sleep } from '@ringcentral-integration/utils';

import {
  action,
  createApp,
  RcModuleV2,
  state,
  subscribe,
} from '../../lib/RcModule';

const onStateChangeFn = jest.fn();
const subscribeFn = jest.fn();

class Counter extends RcModuleV2 {
  constructor() {
    super();
    subscribe(this, () => {
      subscribeFn();
    });
  }

  @state
  count = { sum: 0 };

  @action
  increase() {
    this.count.sum += 1;
  }

  override async onInit() {
    await sleep(100);
  }
}

class Root extends RcModuleV2<{ counter: Counter }> {
  constructor(deps: { counter: Counter }) {
    super({ deps });
  }

  override onStateChange() {
    onStateChangeFn();
  }

  get counter() {
    return this._deps.counter;
  }
}

@autorun(test)
@title('CreateApp::basic')
export class CreateAppBasic extends Step {
  run() {
    let counter: Counter;
    let root: Root;
    let oldCount: Counter['count'];
    return (
      <Scenario desc="">
        <Given
          desc="Define modules and create instances"
          action={() => {
            counter = new Counter();
            root = new Root({
              counter,
            });
            // scenario for checking recurring subscriptions.
            Object.assign(root, { _counter: counter });
          }}
        />
        <When
          desc="Create app with modules instances"
          action={async () => {
            createApp({
              main: root,
              modules: {
                counter,
              },
            });
            expect(onStateChangeFn.mock.calls.length).toBe(0);
            expect(root.ready).toBe(false);
            expect(root.counter.ready).toBe(false);
            await sleep(0);
            expect(onStateChangeFn.mock.calls.length).toBe(1);
          }}
        />
        <Then
          desc="fn should be called onStateChange and lifecycle"
          action={async () => {
            await sleep(500);
            expect(onStateChangeFn.mock.calls.length).toBe(4);
            expect(subscribeFn.mock.calls.length).toBe(4);
            expect(root.ready).toBe(true);
            expect(root.counter.ready).toBe(true);
          }}
        />
        <When
          desc="call counter increase"
          action={() => {
            oldCount = root.counter.count;
            expect(oldCount.sum).toBe(0);
            root.counter.increase();
          }}
        />
        <Then
          desc="count in counter should be updated"
          action={() => {
            expect(oldCount === root.counter.count).toBe(false);
            expect(root.counter.count.sum).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}
