import {
  Auth,
  AvailabilityMonitor,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface RefreshTokenProps {
  healthCheck?: boolean;
  manualHealthCheck?: boolean;
}

/**
 * Trigger refresh auth token
 */
export const RefreshToken: StepFunction<RefreshTokenProps> = async (
  { healthCheck, manualHealthCheck },
  { app },
) => {
  const auth = app.container.got(Auth)!;
  try {
    await auth.refreshToken();
  } catch (error) {
    console.error('refreshToken error', error);
  }

  // Call directly as a workaround for faking timer
  if (healthCheck || manualHealthCheck) {
    try {
      const availabilityMonitor = app.container.got(AvailabilityMonitor)!;
      await availabilityMonitor._healthCheck({ manual: manualHealthCheck });
    } catch (error) {
      console.error('_healthCheck error', error);
    }
  }
};
