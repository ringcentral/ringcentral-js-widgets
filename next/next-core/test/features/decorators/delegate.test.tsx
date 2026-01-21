/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  App,
  createSharedApp,
  delegate,
  injectable,
  RcViewModule,
  render,
  unmountComponentAtNode,
} from '../../../';

import { Example } from './example';

let element: Element;
let currentApp: App<any, any, any>;

beforeEach(() => {
  element = document.createElement('div');
  document.body.appendChild(element);
});

afterEach(() => {
  unmountComponentAtNode(element);
  element.remove();
  currentApp.destroy();
});

@autorun(test)
@title('create a base app with @computed')
class DelegateInWorkerShouldSerialize extends Step {
  run() {
    const componentRenderFn = jest.fn();
    const computedFn = jest.fn();
    process.env.WORKER_TEST_ENABLED = 'true';

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      @delegate('all')
      async all(value: any) {}
      @delegate('clients')
      async clients(value: any) {}
      @delegate('mainClient')
      async mainClient(value: any) {}
      @delegate('server')
      async server(value: any) {}

      component() {
        const elm = document.createElement('button');
        elm.addEventListener('click', () => {
          this.all({ a: '123' });
        });
        document.body.appendChild(elm);
        return null;
      }
    }
    let app: App<CounterView, any, any>;

    return (
      <Scenario desc="When process.env.WORKER_TEST_ENABLED is true should throw error when data not serializable">
        <Given
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render,
            });
            currentApp = app;
          }}
        />
        <When
          desc="Bootstrap app"
          action={async () => {
            expect(componentRenderFn.mock.calls).toEqual([]);
            await app.bootstrap(element);
          }}
        />
        <Then
          desc="all delegate should throw error when data not serializable"
          action={async () => {
            const counterView = currentApp.container.got(CounterView)!;

            const a = { b: '123', c: null };
            const b = { a };
            a.c = b as any;

            await expect(counterView.all(a)).rejects.toThrow(
              '[parallel] the args must be serializable',
            );
            await expect(counterView.clients(a)).rejects.toThrow(
              '[parallelClients] the args must be serializable',
            );
            await expect(counterView.mainClient(a)).rejects.toThrow(
              '[delegateMainClient] the args must be serializable',
            );
            await expect(counterView.server(a)).rejects.toThrow(
              '[proxify] the args must be serializable',
            );
          }}
        />
        <Then
          desc="all delegate should throw error when data is React element"
          action={async () => {
            const counterView = currentApp.container.got(CounterView)!;

            const a = Example();

            await expect(counterView.all(a)).rejects.toThrow(
              '[parallel] the args must be serializable',
            );
            await expect(counterView.clients(a)).rejects.toThrow(
              '[parallelClients] the args must be serializable',
            );
            await expect(counterView.mainClient(a)).rejects.toThrow(
              '[delegateMainClient] the args must be serializable',
            );
            await expect(counterView.server(a)).rejects.toThrow(
              '[proxify] the args must be serializable',
            );
          }}
        />
      </Scenario>
    );
  }
}
