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
  waitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';
import { Subject, takeUntil, tap } from 'rxjs';

import {
  action,
  App,
  createSharedApp,
  fromSubscribe,
  injectable,
  RcViewModule,
  state,
} from '../../';
import { subscribeWaitUntilTo } from '../lib/whenStateChange';

const subscribeTriggerFn = jest.fn();

const destroy$ = new Subject<void>();

beforeEach(() => {
  subscribeTriggerFn.mockReset();
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

  constructor() {
    super();

    fromSubscribe(this)
      .pipe(
        tap(() => {
          subscribeTriggerFn();
        }),
        takeUntil(destroy$),
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
@title('FromSubscribe')
class FromSubscribe extends Step {
  run() {
    const renderFn = jest.fn();
    let app: App<CounterView, any, any>;

    const changeState = (state = true) => {
      const counterView = app.container.got(CounterView)!;

      counterView.setEnable(state);
    };

    return (
      <Scenario desc="check fromSubscribe can be work with rxjs">
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
          desc="event should be trigger when init"
          action={() => {
            expect(subscribeTriggerFn).toHaveBeenCalledTimes(5);
          }}
        />
        <When desc="set state be true" action={() => changeState(true)} />
        <And
          desc="Subscribe event be trigger one more time"
          action={() => {
            expect(subscribeTriggerFn).toHaveBeenCalledTimes(6);
          }}
        />
        <When desc="set state be true again" action={() => changeState(true)} />
        <Then
          desc="Subscribe event be trigger one more time"
          action={() => {
            expect(subscribeTriggerFn).toHaveBeenCalledTimes(7);
          }}
        />
        <When
          desc="set state be true again"
          action={() => changeState(false)}
        />
        <Then
          desc="watch state still be trigger again"
          action={() => {
            expect(subscribeTriggerFn).toHaveBeenCalledTimes(8);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('FromSubscribe not emit after unsubscribe')
class FromSubscribeDestroy extends Step {
  run() {
    const renderFn = jest.fn();
    let app: App<CounterView, any, any>;

    const changeState = (state = true) => {
      const counterView = app.container.got(CounterView)!;

      counterView.setEnable(state);
    };

    return (
      <Scenario desc="check fromSubscribe not emit after unsubscribe">
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
          desc="event should be trigger when init"
          action={() => {
            expect(subscribeTriggerFn).toHaveBeenCalledTimes(5);
          }}
        />
        <When desc="set state be true" action={() => changeState(true)} />
        <And
          desc="Watch event be trigger one more time"
          action={() => {
            expect(subscribeTriggerFn).toHaveBeenCalledTimes(6);
          }}
        />
        <When desc="destroy subscribe" action={() => destroy$.next()} />
        <Then
          desc="watch state still be trigger same times"
          action={() => {
            expect(subscribeTriggerFn).toHaveBeenCalledTimes(6);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('FromSubscribe not emit after unsubscribe')
class SubscribeWaitUntilTo extends Step {
  run() {
    const renderFn = jest.fn();
    let app: App<CounterView, any, any>;
    let waitPassPromise: Promise<any>;

    const changeState = (state = true) => {
      const counterView = app.container.got(CounterView)!;

      counterView.setEnable(state);
    };

    return (
      <Scenario desc="check fromSubscribe not emit after unsubscribe">
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
          desc="add subscribeWaitUntilTo to check enable state"
          action={() => {
            const counterView = app.container.got(CounterView)!;

            waitPassPromise = subscribeWaitUntilTo(counterView, () => {
              expect(counterView.enable).toBeTruthy();
              // return 100 for check in below return value
              return 100;
            });
          }}
        />
        <When desc="set state be true" action={() => changeState(true)} />
        <And
          desc="wait promise be pass and get the return value"
          action={async () => {
            await expect(waitPassPromise).resolves.toBe(100);
          }}
        />
        <Then
          desc="counterView enable to be true"
          action={() => {
            const counterView = app.container.got(CounterView)!;
            expect(counterView.enable).toBeTruthy();
          }}
        />
        <When
          desc="add subscribeWaitUntilTo to check enable state again but never success"
          action={() => {
            const counterView = app.container.got(CounterView)!;
            jest.useFakeTimers();

            waitPassPromise = subscribeWaitUntilTo(counterView, () => {
              throw new Error('never success');
            });
          }}
        />
        <Then desc="set state be true" action={() => changeState(false)} />
        <And
          desc="pass that 5000 default timeout, that should throw error"
          action={async () => {
            jest.advanceTimersByTime(5000);

            await expect(waitPassPromise).rejects.toThrow('never success');

            jest.useRealTimers();
          }}
        />
        <When desc="destroy subscribe" action={() => destroy$.next()} />
      </Scenario>
    );
  }
}
