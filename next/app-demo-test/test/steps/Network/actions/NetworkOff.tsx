import { ConnectivityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const NetworkOff: StepFunction = (_, { app }) => {
  app.container.got(ConnectivityMonitor)!.setNetworkLoss();
};
