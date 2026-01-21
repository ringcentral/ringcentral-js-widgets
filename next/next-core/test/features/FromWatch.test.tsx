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
import { Subject, takeUntil, tap } from 'rxjs';

import {
  action,
  App,
  createSharedApp,
  fromWatch,
  injectable,
  RcViewModule,
  state,
} from '../../';

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

  readonly watch$ = fromWatch(this, () => this.enable).pipe(
    takeUntil(destroy$),
  );

  @action
  setEnable(val: boolean) {
    this.enable = val;
  }

  constructor() {
    super();

    this.watch$
      .pipe(
        tap((state) => {
          watchTriggerFn(state);
        }),
      )
      .subscribe();
  }

  component() {
    return null;
  }
}

@autorun(test)
@ut
@p2
@title('FromWatch')
class FromWatch extends Step {
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
      <Scenario desc="check fromWatch can be work with rxjs">
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
          desc="event should not be trigger when init subscribe"
          action={() => {
            expect(watchTriggerFn).not.toHaveBeenCalled();
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
            expect(watchTriggerFn).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="set state be true again"
          action={() => changeState(false)}
        />
        <Then
          desc="watch state still be trigger again"
          action={() => {
            expect(watchTriggerFn).toHaveBeenCalledTimes(2);
            expect(watchTriggerFn).toHaveBeenCalledWith(false);
          }}
        />
        <Then
          desc="add addition watch still have one watch in background"
          action={() => {
            checkWatchingCount(1);

            const counterView = app.container.got(CounterView)!;

            counterView.watch$.subscribe();

            checkWatchingCount(1);
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
@title('FromWatch not emit after unsubscribe')
class FromWatchDestroy extends Step {
  run() {
    const renderFn = jest.fn();
    let app: App<CounterView, any, any>;

    const changeState = (state = true) => {
      const counterView = app.container.got(CounterView)!;

      counterView.setEnable(state);
    };

    return (
      <Scenario desc="check fromWatch not emit after unsubscribe">
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
          desc="event should not be trigger when init subscribe"
          action={() => {
            expect(watchTriggerFn).not.toHaveBeenCalled();
          }}
        />
        <When desc="set state be true" action={() => changeState(true)} />
        <And
          desc="Watch event be trigger with true"
          action={() => {
            expect(watchTriggerFn).toHaveBeenCalledWith(true);
          }}
        />
        <When desc="destroy subscribe" action={() => destroy$.next()} />
        <Then
          desc="watch state still be trigger once"
          action={() => {
            expect(watchTriggerFn).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="set state be true again"
          action={() => changeState(false)}
        />
        <Then
          desc="watch state still be trigger once"
          action={() => {
            expect(watchTriggerFn).toHaveBeenCalledTimes(1);
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
