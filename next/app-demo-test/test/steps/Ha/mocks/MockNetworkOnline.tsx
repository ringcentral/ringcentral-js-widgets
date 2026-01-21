import { ConnectivityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockNetworkOnline: StepFunction = (_, { app, payload }) => {
  const connectivityMonitor = app.container.got(ConnectivityMonitor)!;
  if (!connectivityMonitor) {
    throw new Error('connectivityMonitor is required');
  }

  if (payload._requestSuccessHandler) {
    // Restore the original function
    connectivityMonitor._unbindHandlers?.();
    connectivityMonitor._requestSuccessHandler = payload._requestSuccessHandler;
    connectivityMonitor._bindHandlers();
    // Clean cache
    delete payload._requestSuccessHandler;
  }

  // Event dispatch
  const event = new Event('online');
  window.dispatchEvent(event);

  // Notify
  connectivityMonitor._requestSuccessHandler();
};
