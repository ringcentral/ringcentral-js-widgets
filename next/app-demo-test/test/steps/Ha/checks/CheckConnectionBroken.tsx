import type { StepFunction } from '@ringcentral-integration/test-utils';

import { CheckContainsAlertMessage } from '../../Alert';
import { CheckCallButtonDisabled } from '../../Dialer';
import { NavigateTo } from '../../Router';

import { CheckConnectivityBadge } from './CheckConnectivityBadge';

interface CheckConnectionBrokenProps {
  badge?: boolean;
  badgeText?: string;
  alertMessage?: string;
  checkConnectionSpy?: jest.Spied;
  advanceTimersTime?: number;
}

/**
 * Verify the behavior of the app when connection is broken
 * @param alertMessage string value, will check alert message if specified
 * @param checkConnectionSpy The spy instance to check connectivity
 * @param advanceTimersTime The time consumed to trigger one time connection checking
 * @returns Verify steps
 */
export const CheckConnectionBroken: StepFunction<
  CheckConnectionBrokenProps
> = async ({
  badge = true,
  badgeText = 'Offline',
  alertMessage,
  checkConnectionSpy,
  advanceTimersTime = -1,
}) => {
  return (
    <>
      {/* The badge 'Offline' prompt */}
      <CheckConnectivityBadge exists={badge} textContent={badgeText} />

      {/* Button disabled */}
      <NavigateTo path="/dialer" />
      <CheckCallButtonDisabled />

      {/* Alert message */}
      {alertMessage && <CheckContainsAlertMessage message={alertMessage} />}

      {/* Can capture request */}
      {() => {
        if (checkConnectionSpy) {
          if (advanceTimersTime > 0) {
            checkConnectionSpy.mockReset();
            jest.advanceTimersByTime(advanceTimersTime);
            jest.useRealTimers();
          }
          expect(checkConnectionSpy).toHaveBeenCalledTimes(1);
        }
      }}
    </>
  );
};
