import { ConnectivityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockNetworkOffline: StepFunction = (_, { app, payload }) => {
  const connectivityMonitor = app.container.got(ConnectivityMonitor)!;
  if (!connectivityMonitor) {
    throw new Error('connectivityMonitor is required');
  }
  if (!payload._requestSuccessHandler) {
    // Store original function
    payload._requestSuccessHandler = connectivityMonitor._requestSuccessHandler;
    // Stop API client from bringing it back to online
    connectivityMonitor._unbindHandlers?.();
    connectivityMonitor._requestSuccessHandler = jest.fn();
    connectivityMonitor._bindHandlers();
  }

  // Event dispatch
  const event = new Event('offline');
  window.dispatchEvent(event);
};
