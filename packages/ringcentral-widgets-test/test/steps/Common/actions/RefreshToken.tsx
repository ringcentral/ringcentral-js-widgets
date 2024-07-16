import type { AvailabilityMonitor } from '@ringcentral-integration/commons/modules/AvailabilityMonitor';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

interface RefreshTokenProps {
  healthCheck?: boolean;
  manualHealthCheck?: boolean;
}

/**
 * Trigger refresh auth token
 * @param healthCheck indicates trigger healthCheck or not
 */
export const RefreshToken: StepFunction<RefreshTokenProps> = async (
  { healthCheck, manualHealthCheck },
  { phone }: Context,
) => {
  try {
    await phone.auth.refreshToken();
  } catch (error) {
    console.error('refreshToken error', error);
  }
  // Call directly as a workaround for faking timer
  if (healthCheck || manualHealthCheck) {
    try {
      const availabilityMonitor: AvailabilityMonitor =
        phone.availabilityMonitor;
      await availabilityMonitor._healthCheck({ manual: manualHealthCheck });
    } catch (error) {
      console.error('_healthCheck error', error);
    }
  }
};
