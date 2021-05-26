import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';

import {
  RcModuleV2,
  state,
  action,
  watch,
  subscribe,
  createApp,
} from '../../lib';

const generateModule = (subscribeFn: Function, watchFn: Function) => {
  class Counter extends RcModuleV2 {
    unsubscribe: () => void;
    dispose: () => void;

    constructor(options: any) {
      super(options);

      this.unsubscribe = subscribe(this, () => {
        subscribeFn();
      });

      this.dispose = watch(
        this,
        () => this.list,
        (newValue, oldValue) => {
          watchFn(newValue, oldValue);
        },
      );
    }

    @state
    count = 0;

    @state
    list: number[] = [];

    @action
    increase() {
      this.count += 1;
    }

    @action
    add() {
      this.list.push(this.list.length);
    }
  }
  return Counter;
};

@autorun(test)
@title('RcModuleV2::subscribe check')
class ModuleSubscribeCheck extends Step {
  run() {
    return (
      <Scenario desc="RcModuleV2::subscribe check about 'subscribe' and 'watch' features">
        <Given
          desc="Generate RcModuleV2 instance counterInstance of class Counter"
          action={(_: any, context: any) => {
            context.subscribeFn = jest.fn();
            context.watchFn = jest.fn();
            context.Counter = generateModule(
              context.subscribeFn,
              context.watchFn,
            );
            context.counterInstance = createApp({
              main: new context.Counter(),
            });
            expect(context.counterInstance instanceof context.Counter).toBe(
              true,
            );
          }}
        />
        <When
          desc="Execute state changes"
          action={async (_: any, context: any) => {
            const { counterInstance, watchFn, subscribeFn } = context;
            counterInstance.increase();
            await new Promise((r) => setTimeout(r));
            expect(counterInstance.ready).toBe(true);
            expect(subscribeFn.mock.calls.length).toBe(3);
            expect(watchFn.mock.calls.length).toBe(0);
            counterInstance.add();
          }}
        />
        <Then
          desc="The 'subscribe' and 'watch' should be expected"
          action={(_: any, context: any) => {
            const { watchFn, subscribeFn } = context;
            expect(subscribeFn.mock.calls.length).toBe(4);
            expect(watchFn.mock.calls).toEqual([[[0], []]]);
          }}
        />
        <When
          desc="The 'subscribe' and 'watch' were unsubscribed"
          action={(_: any, context: any) => {
            const { counterInstance } = context;
            counterInstance.unsubscribe();
            counterInstance.dispose();
            counterInstance.increase();
            counterInstance.add();
          }}
        />
        <Then
          desc="The 'subscribe' and 'watch' should be not called"
          action={(_: any, context: any) => {
            const { watchFn, subscribeFn } = context;
            expect(subscribeFn.mock.calls.length).toBe(4);
            expect(watchFn.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}
