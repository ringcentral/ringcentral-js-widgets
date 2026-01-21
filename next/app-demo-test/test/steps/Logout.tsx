import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface LogoutProps {
  shouldFlush?: boolean;
  shouldReset?: boolean;
}

export const Logout: StepFunction<LogoutProps> = async (
  { shouldFlush, shouldReset = false },
  { rcMock, app },
) => {
  app.modules.Webphone?._webphone?.userAgent.removeAllListeners();
  await app.modules.Auth.logout({
    reason: 'Manually sign out',
    payload: {
      detail: 'from test',
    },
  });
  // wait for logout success or jest timeout
  await whenStateChange(() => {
    expect(app.modules.Auth.loggedIn).toBeFalsy();
  });
  if (shouldFlush) {
    // Clear all storage module data
    await app.modules.Storage?.flush();
  }

  if (shouldReset) {
    // Reset all modules
    rcMock.reset();
    app.unmount();
  }

  if (window.analytics) {
    window.analytics.invoked = false;
  }
};
