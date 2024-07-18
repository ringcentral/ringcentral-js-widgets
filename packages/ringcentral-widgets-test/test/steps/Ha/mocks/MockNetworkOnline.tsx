import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const MockNetworkOnline: StepFunction = (
  _: unknown,
  context: Context,
) => {
  const connectivityMonitor: ConnectivityMonitor =
    context.phone.connectivityMonitor;
  if (!connectivityMonitor) {
    throw new Error('connectivityMonitor is required');
  }

  const payload = context.payload as any;
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
