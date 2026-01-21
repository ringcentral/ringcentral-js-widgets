import {
  autorun,
  Given,
  p2,
  Scenario,
  Step,
  title,
  ut,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { finalize, firstValueFrom, of, Subject, tap } from 'rxjs';

import { answer, fromPortal } from '../../';

@autorun(test)
@ut
@p2
@title('FromPortal behaviors')
class FromPortal extends Step {
  run() {
    return (
      <Scenario desc="check fromWatch can be work with rxjs">
        <Given
          desc="return true behaviors"
          action={async () => {
            const {
              close,
              confirmFn,
              confirmThenFn,
              cancelFn,
              cancelThenFn,
              thenFn,
              allDoneFn,
              closed$,
              subscription,
            } = this.init();

            expect(close).not.toHaveBeenCalled();
            expect(confirmFn).not.toHaveBeenCalled();
            expect(confirmThenFn).not.toHaveBeenCalled();
            expect(cancelFn).not.toHaveBeenCalled();
            expect(cancelThenFn).not.toHaveBeenCalled();
            expect(thenFn).not.toHaveBeenCalled();
            expect(allDoneFn).not.toHaveBeenCalled();

            closed$.next(true);
            await waitForRenderReady();

            expect(close).not.toHaveBeenCalled();
            expect(confirmFn).toHaveBeenCalledWith(true);
            expect(confirmThenFn).toHaveBeenCalled();
            expect(cancelFn).not.toHaveBeenCalled();
            expect(cancelThenFn).not.toHaveBeenCalled();
            expect(thenFn).toHaveBeenCalledWith(true);
            expect(allDoneFn).toHaveBeenCalled();

            expect(subscription.closed).toBeTruthy();
          }}
        />
        <Given
          desc="return false behaviors"
          action={async () => {
            const {
              close,
              confirmFn,
              confirmThenFn,
              cancelFn,
              cancelThenFn,
              thenFn,
              allDoneFn,
              closed$,
              subscription,
            } = this.init();

            expect(close).not.toHaveBeenCalled();
            expect(confirmFn).not.toHaveBeenCalled();
            expect(confirmThenFn).not.toHaveBeenCalled();
            expect(cancelFn).not.toHaveBeenCalled();
            expect(cancelThenFn).not.toHaveBeenCalled();
            expect(thenFn).not.toHaveBeenCalled();
            expect(allDoneFn).not.toHaveBeenCalled();

            closed$.next(false);
            await waitForRenderReady();

            expect(close).not.toHaveBeenCalled();
            expect(confirmFn).not.toHaveBeenCalled();
            expect(confirmThenFn).not.toHaveBeenCalled();
            expect(cancelFn).toHaveBeenCalledWith(false);
            expect(cancelThenFn).toHaveBeenCalled();
            expect(thenFn).toHaveBeenCalledWith(false);
            expect(allDoneFn).toHaveBeenCalled();

            expect(subscription.closed).toBeTruthy();
          }}
        />
        <Given
          desc="unsubscribe close should be called"
          action={async () => {
            const {
              close,
              confirmFn,
              confirmThenFn,
              cancelFn,
              cancelThenFn,
              thenFn,
              allDoneFn,
              closed$,
              subscription,
            } = this.init();

            expect(close).not.toHaveBeenCalled();
            expect(confirmFn).not.toHaveBeenCalled();
            expect(confirmThenFn).not.toHaveBeenCalled();
            expect(cancelFn).not.toHaveBeenCalled();
            expect(cancelThenFn).not.toHaveBeenCalled();
            expect(thenFn).not.toHaveBeenCalled();
            expect(allDoneFn).not.toHaveBeenCalled();

            subscription.unsubscribe();
            await waitForRenderReady();

            expect(close).toHaveBeenCalled();
            expect(confirmFn).not.toHaveBeenCalled();
            expect(confirmThenFn).not.toHaveBeenCalled();
            expect(cancelFn).not.toHaveBeenCalledWith(false);
            expect(cancelThenFn).not.toHaveBeenCalled();
            expect(thenFn).not.toHaveBeenCalledWith(false);
            expect(allDoneFn).toHaveBeenCalled();

            expect(subscription.closed).toBeTruthy();
          }}
        />
      </Scenario>
    );
  }

  private init() {
    const closed$ = new Subject<boolean | null>();
    const close = jest.fn();
    const confirmFn = jest.fn();
    const confirmThenFn = jest.fn();
    const cancelFn = jest.fn();
    const cancelThenFn = jest.fn();
    const thenFn = jest.fn();
    const allDoneFn = jest.fn();

    const obs$ = fromPortal(() => ({
      id: '10',
      closed: firstValueFrom(closed$),
      close,
    })).pipe(
      answer({
        confirm: (x) => {
          confirmFn(x);

          return of('confirm').pipe(
            tap(() => {
              confirmThenFn();
            }),
          );
        },
        cancel: (x) => {
          cancelFn(x);
          return of('cancel').pipe(
            tap(() => {
              cancelThenFn();
            }),
          );
        },
      }),
      tap((x) => {
        thenFn(x);
      }),
      finalize(() => {
        allDoneFn();
      }),
    );

    const subscription = obs$.subscribe();
    return {
      close,
      confirmFn,
      confirmThenFn,
      cancelFn,
      cancelThenFn,
      thenFn,
      allDoneFn,
      closed$,
      subscription,
    };
  }
}
