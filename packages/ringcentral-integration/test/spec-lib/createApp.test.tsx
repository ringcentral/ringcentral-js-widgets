import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { createStore } from 'redux';
import { RcModuleV2, state, action } from '@ringcentral-integration/core';
import { Module, ModuleFactory } from '../../lib/di';
import { createApp } from '../../lib/createApp';
import sleep from '../../lib/sleep';

@autorun(test)
@title('CreateApp::basic')
export class CreateAppBasic extends Step {
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
                await new Promise((r) => setTimeout(r, 1000));
              }
            }

            @ModuleFactory({
              providers: [{ provide: 'Counter', useClass: Counter }],
            })
            class Root extends RcModuleV2 {
              constructor(public options: any) {
                super({ deps: options });
              }

              onStateChange() {
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
            const root = createApp(Root);
            context.root = root;
            const store = createStore(root.reducer);
            root.setStore(store);
            expect(context.fn.mock.calls.length).toBe(0);
            expect(root.ready).toBe(false);
            expect(root.counter.ready).toBe(false);
            await sleep(0);
            expect(fn.mock.calls.length).toBe(1);
          }}
        />
        <Then
          desc="fn should be called onStateChange and lifecycle"
          action={async (_: any, context: any) => {
            const { root, fn } = context;
            await sleep(2000);
            expect(fn.mock.calls.length).toBe(4);
            expect(root.ready).toBe(true);
            expect(root.counter.ready).toBe(true);
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
