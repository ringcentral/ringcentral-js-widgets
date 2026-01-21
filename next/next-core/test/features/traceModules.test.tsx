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
  App,
  Root,
} from '../..';

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
    return null;
  }
}

@autorun(test)
@title('base traceModules()')
class Base extends Step {
  run() {
    let app: App<CounterView, any, any>;
    let result: any;
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
              render: () => null,
            });
          }}
        />
        <When
          desc="call traceModules() for debugging"
          action={() => {
            result = global.traceModules();
          }}
        />
        <Then
          desc="Check the result"
          action={() => {
            expect(result.length).toBe(3);
            const data = result.map(
              ([module, constructor, moduleInitTime]: any) => [
                module,
                constructor,
                typeof moduleInitTime,
              ],
            );

            expect(data).toContainEqual([
              app.instance.counter,
              Counter,
              'number',
            ]);
            expect(data).toContainEqual([app.instance, CounterView, 'number']);
            expect(data).toContainEqual([
              app.container.got(Root),
              Root,
              'number',
            ]);
          }}
        />
      </Scenario>
    );
  }
}
