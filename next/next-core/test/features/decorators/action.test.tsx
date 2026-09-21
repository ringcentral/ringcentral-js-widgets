/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  And,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { act } from 'react';

import {
  injectable,
  state,
  action,
  useConnector,
  createSharedApp,
  RcViewModule,
  render,
  App,
  unmountComponentAtNode,
} from '../../..';

let element: Element;
let currentApp: App<any, any, any>;

beforeEach(() => {
  element = document.createElement('div');
  document.body.appendChild(element);
});

afterEach(() => {
  act(() => {
    unmountComponentAtNode(element);
  });
  element.remove();
  currentApp.destroy();
});

// TODO: add test case check error for @action with async function

@autorun(test)
@title('create a base app with @action')
class Base extends Step {
  run() {
    const componentRenderFn = jest.fn();

    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      @state
      count = 0;

      @action
      increment() {
        this.count += 1;
      }

      incrementManyTime() {
        Array(10 ** 2)
          .fill(0)
          .forEach(() => this.increment());
      }

      component() {
        const count = useConnector(() => this.count);
        componentRenderFn(count);
        return null;
      }
    }
    let app: App<CounterView, any, any>;
    return (
      <Scenario desc="Base Module">
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
            await act(async () => {
              await app.bootstrap(element);
            });
            expect(componentRenderFn.mock.calls).toEqual([[0]]);
            expect(app.instance.count).toBe(0);
            expect(app.instance.ready).toBeTruthy();
          }}
        />
        <When
          desc="call increment"
          action={() => {
            expect(app.instance.count).toBe(0);
            act(() => {
              app.instance.increment();
            });
          }}
        />
        <Then
          desc="check the count"
          action={async () => {
            await waitForRenderReady();
            expect(componentRenderFn.mock.calls).toEqual([[0], [1]]);
            expect(app.instance.count).toBe(1);
          }}
        />
        <And
          desc="it should throw error when decorate a property method"
          action={() => {
            expect(() => {
              class Test {
                // @ts-ignore
                @action
                incrementProperty = () => {
                  //
                };
              }
            }).toThrow(
              `incrementProperty can only be decorated by '@action' as a class method.`,
            );
          }}
        />
        <And
          desc="it should throw error if it's called too many times"
          action={() => {
            // TODO: only work in development mode, check later.
            // expect(() => {
            //   app.instance.incrementManyTime();
            // }).toThrow('CounterView.increment is called too many times');
          }}
        />
      </Scenario>
    );
  }
}
