import { createStore } from 'redux';

import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Module, ModuleFactory } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import { sleep } from '../../lib/sleep';
import { Locale } from '../../modules/Locale';

@autorun(test)
@title('Compatibility::RcModuleV1')
export class CompatibilityForRcModuleV1 extends Step {
  run() {
    return (
      <Scenario desc="">
        <Given
          desc="Basic create App setup"
          action={(_: any, context: any) => {
            context.fn = jest.fn();

            @Module({
              name: 'Counter',
            })
            class Counter extends RcModuleV2 {
              @state
              count = { sum: 0 };

              @action
              increase() {
                this.count.sum += 1;
              }

              async onInit() {
                await new Promise((r) => setTimeout(r, 0));
              }
            }

            @ModuleFactory({
              providers: [
                { provide: 'Counter', useClass: Counter },
                { provide: 'Locale', useClass: Locale },
                {
                  provide: 'Brand',
                  useValue: {},
                },
              ],
            })
            class Root extends RcModule {
              get status() {
                return this.state.status;
              }

              _onStateChange() {
                context.fn();
              }
            }
            context.Root = Root;
          }}
        />
        <When
          desc="ModuleFactory is created"
          action={async (_: any, context: any) => {
            const { Root, fn } = context;
            const root = Root.create();
            const store = createStore(root.reducer);
            root.setStore(store);
            context.root = root;
            expect(context.fn.mock.calls.length).toBe(2);
            expect(root.ready).toBe(false);
            expect(root.counter.ready).toBe(false);
            expect(root.locale.ready).toBe(false);
            await sleep(0);
          }}
        />
        <Then
          desc="fn should be called onStateChange and lifecycle"
          action={async (_: any, context: any) => {
            const { root, fn } = context;
            await sleep(1000);
            expect(fn.mock.calls.length).toBe(5);
            expect(root.ready).toBe(false);
            expect(root.counter.ready).toBe(true);
            expect(root.locale.ready).toBe(true);
          }}
        />
        <When
          desc="call counter increase"
          action={(_: any, context: any) => {
            const { root } = context;
            context.oldCount = root.counter.count;
            expect(context.oldCount.sum).toBe(0);
            root.counter.increase();
          }}
        />
        <Then
          desc="count in counter should be updated"
          action={async (_: any, context: any) => {
            const { root, oldCount } = context;
            expect(oldCount === root.counter.count).toBe(false);
            expect(root.counter.count.sum).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}
