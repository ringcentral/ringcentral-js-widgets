import {
  And,
  autorun,
  Given,
  p2,
  Scenario,
  Step,
  Then,
  title,
  ut,
  When,
} from '@ringcentral-integration/test-utils';
import { unsubscriptionsKey } from 'reactant';
import { firstValueFrom, Subject, takeUntil, tap } from 'rxjs';

import {
  action,
  App,
  createSharedApp,
  fromWatchValue,
  injectable,
  RcViewModule,
  state,
} from '../../';
import { waitSubscribeSuccess } from '../lib/whenStateChange';

const watchTriggerFn = jest.fn();

const destroy$ = new Subject<void>();

beforeEach(() => {
  watchTriggerFn.mockReset();
});

afterEach(() => {
  destroy$.next();
});

@injectable({
  name: 'CounterView',
})
class CounterView extends RcViewModule {
  @state
  enable = false;

  @action
  setEnable(val: boolean) {
    this.enable = val;
  }

  readonly enable$ = fromWatchValue(this, () => this.enable).pipe(
    tap((state) => {
      watchTriggerFn(state);
    }),
    takeUntil(destroy$),
  );

  constructor() {
    super();

    this.enable$.subscribe();
  }

  component() {
    return null;
  }
}

@autorun(test)
@ut
@p2
@title('FromWatchValue')
class FromWatchValue extends Step {
  run() {
    const renderFn = jest.fn();
    let app: App<CounterView, any, any>;

    const changeState = (state = true) => {
      const counterView = app.container.got(CounterView)!;

      counterView.setEnable(state);
    };

    const checkWatchingCount = (count: number) => {
      const counterView = app.container.got(CounterView)!;

      const unsubscribeFunctions = (counterView as any)[
        unsubscriptionsKey
      ] as Set<() => void>;

      expect(unsubscribeFunctions.size).toBe(count + 1); // add one for there is a default unsubscribe function
    };

    return (
      <Scenario desc="check fromWatchValue can be work with rxjs">
        <Given
          desc="ini app"
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
        <Then
          desc="event should be trigger once when init subscribe"
          action={() => {
            checkWatchingCount(1);
            expect(watchTriggerFn).toHaveBeenCalled();
            expect(watchTriggerFn).toHaveBeenCalledWith(false);
          }}
        />
        <When desc="set state be true" action={() => changeState(true)} />
        <And
          desc="Watch event be trigger with true"
          action={() => {
            expect(watchTriggerFn).toHaveBeenCalledWith(true);
          }}
        />
        <When desc="set state be true again" action={() => changeState(true)} />
        <Then
          desc="watch state still be trigger once"
          action={() => {
            expect(watchTriggerFn).toHaveBeenCalledTimes(2);
          }}
        />
        <When
          desc="set state be true again"
          action={() => changeState(false)}
        />
        <Then
          desc="watch state still be trigger again"
          action={() => {
            expect(watchTriggerFn).toHaveBeenCalledTimes(3);
            expect(watchTriggerFn).toHaveBeenCalledWith(false);
          }}
        />
        <Then
          desc="destroy application"
          action={() => {
            checkWatchingCount(1);

            destroy$.next();
            checkWatchingCount(0);

            app.destroy();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('FromWatchValue')
class FromWatchValueShareReplay extends Step {
  run() {
    const renderFn = jest.fn();
    let app: App<CounterView, any, any>;

    const changeState = (state = true) => {
      const counterView = app.container.got(CounterView)!;

      counterView.setEnable(state);
    };

    const checkWatchingCount = (count: number) => {
      const counterView = app.container.got(CounterView)!;

      const unsubscribeFunctions = (counterView as any)[
        unsubscriptionsKey
      ] as Set<() => void>;

      expect(unsubscribeFunctions.size).toBe(count + 1); // add one for there is a default unsubscribe function
    };

    return (
      <Scenario desc="check fromWatchValue can be work with rxjs">
        <Given
          desc="ini app"
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
        <Then
          desc="watch that enable$ again should get current value"
          action={async () => {
            const counterView = app.container.got(CounterView)!;

            await waitSubscribeSuccess(counterView.enable$, (enable) => {
              expect(enable).toBeFalsy();
            });
          }}
        />
        <When desc="set state be true" action={() => changeState(true)} />
        <Then
          desc="watch that enable$ again should get current value"
          action={async () => {
            const counterView = app.container.got(CounterView)!;

            const enable = await firstValueFrom(counterView.enable$);
            expect(enable).toBeTruthy();
          }}
        />
        <When
          desc="clear module subscribe, and subscribe to that enable$ multiple times"
          action={async () => {
            checkWatchingCount(1);

            destroy$.next();

            checkWatchingCount(0);

            watchTriggerFn.mockReset();

            expect(watchTriggerFn).not.toHaveBeenCalled();

            const counterView = app.container.got(CounterView)!;

            const result = await Promise.all([
              firstValueFrom(counterView.enable$),
              firstValueFrom(counterView.enable$),
              firstValueFrom(counterView.enable$),
              firstValueFrom(counterView.enable$),
            ]);

            expect(result).toEqual([true, true, true, true]);
          }}
        />
        <Then
          desc="watch state still be trigger 4 times and not more watch unsubscribe events"
          action={() => {
            expect(watchTriggerFn).toHaveBeenCalledTimes(4);

            checkWatchingCount(0);
          }}
        />
        <Then
          desc="destroy application"
          action={() => {
            app.destroy();
          }}
        />
      </Scenario>
    );
  }
}
