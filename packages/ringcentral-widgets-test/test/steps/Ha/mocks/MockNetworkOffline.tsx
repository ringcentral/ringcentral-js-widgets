import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const MockNetworkOffline: StepFunction = (
  _: unknown,
  context: Context,
) => {
  const connectivityMonitor: ConnectivityMonitor =
    context.phone.connectivityMonitor;
  if (!connectivityMonitor) {
    throw new Error('connectivityMonitor is required');
  }

  const payload = context.payload as any;
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
