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
  createSharedApp,
  RcModule,
  RcViewModule,
  useConnector,
  App,
  render,
  unmountComponentAtNode,
  inject,
  optional,
} from '../..';

let componentRenderFn = jest.fn();
let element: Element;

beforeEach(() => {
  componentRenderFn = jest.fn();
  element = document.createElement('div');
  document.body.appendChild(element);
});

afterEach(() => {
  unmountComponentAtNode(element);
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
@title('base dependency injection')
class Base extends Step {
  run() {
    interface IFoo {
      bar: string;
    }

    @injectable({
      name: 'Foo',
    })
    class Foo extends RcModule implements IFoo {
      bar = '123';
    }

    @injectable({
      name: 'FooBar',
    })
    class FooBar {}

    @injectable({
      name: 'Bar',
    })
    class Bar {
      s = 's';
    }

    @injectable({
      name: 'AppView',
    })
    class AppView extends RcViewModule {
      constructor(
        @inject('foo') public foo: IFoo,
        public counterView: CounterView,
        @optional() public fooBar?: FooBar,
        @optional(Bar) public bar?: any,
      ) {
        super();
      }

      component() {
        return null;
      }
    }
    const renderFn = jest.fn();
    let app: App<AppView, any, any>;
    return (
      <Scenario desc="Base Module">
        <Given
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [
                {
                  provide: 'foo',
                  useClass: Foo,
                },
                {
                  provide: Bar,
                  useValue: {
                    s: 's1',
                  },
                },
              ],
              main: AppView,
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
          desc="Check the injection"
          action={() => {
            expect(renderFn).toHaveBeenCalledTimes(1);
            expect(app.instance.foo instanceof Foo).toBeTruthy();
            expect(
              app.instance.counterView instanceof CounterView,
            ).toBeTruthy();
            expect(app.instance.fooBar).toBeUndefined();
            expect(app.instance.bar!.s).toBe('s1');
          }}
        />
      </Scenario>
    );
  }
}
