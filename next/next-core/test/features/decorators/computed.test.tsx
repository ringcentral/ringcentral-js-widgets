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

import {
  injectable,
  state,
  action,
  computed,
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
  unmountComponentAtNode(element);
  element.remove();
  currentApp.destroy();
});

@autorun(test)
@title('create a base app with @computed')
class Base extends Step {
  run() {
    const componentRenderFn = jest.fn();
    const computedFn = jest.fn();

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

      @state
      count0 = 0;

      @action
      increment0() {
        this.count0 += 1;
      }

      count1 = 0;

      increment1() {
        this.count1 += 1;
      }

      count2 = 0;

      increment2() {
        this.count2 += 1;
      }

      @computed((that: CounterView) => [that.count, that.count1])
      get sum() {
        computedFn();
        return this.count + this.count1 + this.count2;
      }

      component() {
        const sum = useConnector(() => this.sum);
        componentRenderFn(sum);
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
            app.bootstrap(element);
          }}
        />
        <When
          desc="call increment"
          action={() => {
            expect(componentRenderFn.mock.calls).toEqual([[0]]);
            expect(computedFn).toHaveBeenCalledTimes(1);
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.count).toBe(0);
            expect(app.instance.count0).toBe(0);
            expect(app.instance.count1).toBe(0);
            expect(app.instance.count2).toBe(0);
            expect(app.instance.sum).toBe(0);
            app.instance.increment();
          }}
        />
        <Then
          desc="check the values"
          action={() => {
            expect(componentRenderFn.mock.calls).toEqual([[0], [1]]);
            expect(computedFn).toHaveBeenCalledTimes(2);
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.count).toBe(1);
            expect(app.instance.count0).toBe(0);
            expect(app.instance.count1).toBe(0);
            expect(app.instance.count2).toBe(0);
            expect(app.instance.sum).toBe(1);
          }}
        />
        <When
          desc="call increment0"
          action={() => {
            app.instance.increment0();
          }}
        />
        <Then
          desc="no change for the sum value and no render"
          action={() => {
            expect(componentRenderFn.mock.calls).toEqual([[0], [1]]);
            expect(computedFn).toHaveBeenCalledTimes(2);
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.count).toBe(1);
            expect(app.instance.count0).toBe(1);
            expect(app.instance.count1).toBe(0);
            expect(app.instance.count2).toBe(0);
            expect(app.instance.sum).toBe(1);
          }}
        />
        <When
          desc="call increment1"
          action={() => {
            app.instance.increment1();
          }}
        />
        <Then
          desc="change for the sum value and no render"
          action={() => {
            expect(app.instance.sum).toBe(1);
            expect(componentRenderFn.mock.calls).toEqual([[0], [1]]);
            expect(computedFn).toHaveBeenCalledTimes(2);
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.count).toBe(1);
            expect(app.instance.count0).toBe(1);
            expect(app.instance.count1).toBe(1);
            expect(app.instance.count2).toBe(0);
          }}
        />
        <When
          desc="call increment2"
          action={() => {
            app.instance.increment2();
          }}
        />
        <Then
          desc="no change for the sum value and no render"
          action={() => {
            expect(app.instance.sum).toBe(1);
            expect(componentRenderFn.mock.calls).toEqual([[0], [1]]);
            expect(computedFn).toHaveBeenCalledTimes(2);
            expect(app.instance.ready).toBeTruthy();
            expect(app.instance.count).toBe(1);
            expect(app.instance.count0).toBe(1);
            expect(app.instance.count1).toBe(1);
            expect(app.instance.count2).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}
