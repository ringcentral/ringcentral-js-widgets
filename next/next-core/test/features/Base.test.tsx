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
import { act } from 'react';

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
} from '../..';

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

  @state
  count1 = 0;

  @action
  increment1() {
    this.count1 += 1;
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
    componentRenderFn(count);
    return null;
  }
}

@autorun(test)
@title('create a base app')
class Base extends Step {
  run() {
    const renderFn = jest.fn();
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
              render: renderFn,
            });
          }}
        />
        <When
          desc="Bootstrap app"
          action={() => {
            expect(renderFn).toHaveBeenCalledTimes(0);
            app.bootstrap();
          }}
        />
        <Then
          desc="Check the lifecycle"
          action={() => {
            expect(renderFn).toHaveBeenCalledTimes(1);
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.counter.ready).toBeTruthy();
            expect(renderFn).toHaveBeenCalledTimes(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('trigger a action')
class TriggerAction extends Step {
  run() {
    let app: App<CounterView, any, any>;
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap app"
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
            expect(componentRenderFn.mock.calls).toEqual([]);
            await act(async () => {
              await app.bootstrap(element);
            });
          }}
        />
        <When
          desc="Trigger 'increment' action"
          action={() => {
            expect(app.instance.counter.count).toBe(0);
            expect(app.instance.counter.count1).toBe(0);
            expect(componentRenderFn.mock.calls).toEqual([[0]]);
            act(() => {
              app.instance.counter.increment();
            });
          }}
        />
        <Then
          desc="Check the state and component render"
          action={async () => {
            await waitForRenderReady();
            expect(app.instance.counter.count).toBe(1);
            expect(app.instance.counter.count1).toBe(0);
            expect(componentRenderFn.mock.calls).toEqual([[0], [1]]);
          }}
        />
        <When
          desc="Trigger 'increment1' action"
          action={() => {
            expect(app.instance.counter.count).toBe(1);
            expect(app.instance.counter.count1).toBe(0);
            expect(componentRenderFn.mock.calls).toEqual([[0], [1]]);
            app.instance.counter.increment1();
          }}
        />
        <Then
          desc="Check the state and component render"
          action={async () => {
            await waitForRenderReady();
            expect(app.instance.counter.count).toBe(1);
            expect(app.instance.counter.count1).toBe(1);
            expect(componentRenderFn.mock.calls).toEqual([[0], [1]]);
          }}
        />
      </Scenario>
    );
  }
}
