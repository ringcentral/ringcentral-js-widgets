import type { StepFunction } from '@ringcentral-integration/test-utils';

import { CheckCallControlPage, MakeOutboundCall } from '../../Call';
import { CheckCallButtonActive } from '../../Dialer';
import { NavigateTo } from '../../Router';

import { CheckConnectivityBadge } from './CheckConnectivityBadge';

interface CheckConnectionNormallyProps {
  checkConnectionSpy?: jest.Spied;
}

/**
 * Verify the behavior of the app when connection is normally
 * @param checkConnectionSpy The spy instance to check connectivity
 * @returns Verify steps
 */
export const CheckConnectionNormally: StepFunction<
  CheckConnectionNormallyProps
> = async ({ checkConnectionSpy }) => {
  return (
    <>
      {/* The badge disappear */}
      <CheckConnectivityBadge exists={false} />

      {/* Button enabled */}
      <NavigateTo path="/dialer" />
      <CheckCallButtonActive />

      {/* Can not capture the request'https://apps.ringcentral.com/integration/ping' */}
      {() => {
        if (checkConnectionSpy) {
          checkConnectionSpy.mockReset();
          jest.useFakeTimers();
          jest.advanceTimersByTime(5000 + 1000);
          jest.useRealTimers();
          expect(checkConnectionSpy).not.toHaveBeenCalled();
        }
      }}

      {/* User can make the call */}
      <MakeOutboundCall phoneNumber={'+18882556247'} />
      <CheckCallControlPage parsedNumber={'(888) 255-6247'} />
    </>
  );
};
