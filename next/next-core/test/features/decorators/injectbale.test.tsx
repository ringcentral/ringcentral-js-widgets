/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  title,
  Scenario,
  And,
  When,
  Then,
  Step,
  mockAllLogs,
} from '@ringcentral-integration/test-utils';

import {
  injectable,
  state,
  action,
  createSharedApp,
  RcModule,
  RcViewModule,
  App,
} from '../../..';

beforeEach(() => {
  mockAllLogs();
});

@autorun(test)
@title('check error for createSharedApp()')
class ErrorChecker extends Step {
  run() {
    class Counter extends RcModule {
      @state
      count = 0;

      @action
      increment() {
        this.count += 1;
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
    let appPromise: Promise<App<CounterView, any, any>>;
    return (
      <Scenario desc="Base Module">
        <When
          desc="create app without non-injectable module"
          action={async () => {
            appPromise = createSharedApp({
              modules: [],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render: () => {
                //
              },
            });
          }}
        />
        <Then
          desc="should throw error"
          action={async () => {
            await expect(appPromise).rejects.toThrow(
              `No matching bindings found for serviceIdentifier: Counter`,
            );
          }}
        />
        <When
          desc="create app with non-injectable module"
          action={async () => {
            expect(console.error).toHaveBeenCalledTimes(0);
            await createSharedApp({
              modules: [Counter],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render: () => {
                //
              },
            });
          }}
        />
        <Then
          desc="should call console.error"
          action={async () => {
            expect(console.error).toHaveBeenCalledWith(
              `The decorator for class Counter should set "@injectable({ name: 'Counter' })".`,
            );
          }}
        />
        <And
          desc="injectable unexpected name module and should throw error"
          action={async () => {
            expect(console.error).toHaveBeenCalledTimes(1);
            const fn = console.warn as jest.Mock;
            @injectable({
              name: 'foo',
            })
            class NewCounter extends RcModule {
              @state
              count = 0;

              @action
              increment() {
                this.count += 1;
              }
            }
            expect(fn).toHaveBeenCalledWith(
              `@injectable(options) module options.name must be 'NewCounter', please use @injectable({ name: 'NewCounter' })`,
            );
          }}
        />
      </Scenario>
    );
  }
}
