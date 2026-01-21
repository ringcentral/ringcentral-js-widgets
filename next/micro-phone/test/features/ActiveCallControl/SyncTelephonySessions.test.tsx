import {
  AdvanceTimersByTime,
  Given,
  Scenario,
  Step,
  Then,
  UseFakeTimers,
  When,
  autorun,
  it,
  title,
} from '@ringcentral-integration/test-utils';

import { ActiveCallControl } from '../../../src/app/services';
import { type Context } from '../../interfaces';
import { LoginWithMock } from '../../steps/Entry';

@autorun(test)
@it
@title('Sync telephony sessions test')
class SyncTelephonySessionsTest extends Step {
  run() {
    let activeCallControl: ActiveCallControl;
    let fetchDataSpy: jest.SpyInstance;
    let syncDataSpy: jest.SpyInstance;
    return (
      <Scenario desc="Sync telephony sessions test">
        <Given
          desc="App started with user logged in"
          action={[
            <LoginWithMock />,
            <UseFakeTimers />,
            (_: unknown, context: Context) => {
              activeCallControl = context.app.container.got(ActiveCallControl)!;
              expect(activeCallControl).toBeDefined();
              // mock
              fetchDataSpy = jest.spyOn(activeCallControl, 'fetchData');
              syncDataSpy = jest.spyOn(activeCallControl, '_syncData');
              (activeCallControl as any)._polling = true;
              (activeCallControl as any)._timeoutId = 1;
            },
          ]}
        />
        <When
          desc="Start sync telephony sessions with polling"
          action={async () => {
            // test single fetch
            const promise1 = activeCallControl.fetchData();
            const promise2 = activeCallControl.fetchData();
            expect(promise1).toEqual(promise2);
            await promise1;
          }}
        />
        <Then
          desc="Promise reference should be cleared after fetch"
          action={() => {
            expect((activeCallControl as any)._promise).toBeFalsy();
          }}
        />
        <When
          desc="Pulling is triggered by timer"
          action={(_: unknown, context: Context) => {
            fetchDataSpy.mockReset();
            AdvanceTimersByTime({ ms: activeCallControl.ttl + 10 }, context);
          }}
        />
        <Then
          desc="Fetch data should be called"
          action={() => {
            expect(fetchDataSpy).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="Sync data failed with polling enabled"
          action={() => {
            (activeCallControl as any)._polling = true;
            jest.spyOn(activeCallControl as any, '_startPolling');
            syncDataSpy.mockRejectedValueOnce(new Error('Sync data failed'));
          }}
        />
        <Then
          desc="Polling should be started again"
          action={async () => {
            await expect(activeCallControl._fetchData()).rejects.toThrow();
            expect(
              (activeCallControl as any)._startPolling,
            ).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="Sync data failed with polling disabled"
          action={() => {
            (activeCallControl as any)._polling = false;
            jest.spyOn(activeCallControl as any, '_retry');
            syncDataSpy.mockRejectedValueOnce(new Error('Sync data failed'));
          }}
        />
        <Then
          desc="Polling should be started again"
          action={async () => {
            await expect(activeCallControl._fetchData()).rejects.toThrow();
            expect((activeCallControl as any)._retry).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="Retry syncing data is scheduled"
          action={async (_: unknown, context: Context) => {
            fetchDataSpy.mockReset();
            AdvanceTimersByTime({ ms: activeCallControl.timeToRetry }, context);
          }}
        />
        <Then
          desc="fetchData should be called again"
          action={async () => {
            expect(fetchDataSpy).toHaveBeenCalledTimes(1);
          }}
        />
      </Scenario>
    );
  }
}
