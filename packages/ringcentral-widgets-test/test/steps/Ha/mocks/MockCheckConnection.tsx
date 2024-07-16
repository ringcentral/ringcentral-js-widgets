import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

interface MockCheckConnectionProps {
  handler: () => Promise<void>;
}

export const MockCheckConnection: StepFunction<
  MockCheckConnectionProps
> = async ({ handler }, { phone }: Context) => {
  const connectivityMonitor: ConnectivityMonitor = phone.connectivityMonitor;
  if (!connectivityMonitor) {
    throw new Error('connectivityMonitor is required');
  }

  /**
   * The original function is replaced in for test environment
   * integration-apps/ringcentral-js-widgets/ringcentral-widgets-test/test/steps/CreateInstance.ts
   * We bring it back and add custom handler to mock its request behaviors.
   **/
  connectivityMonitor._checkConnectionFunc = async () => {
    try {
      await handler();
      connectivityMonitor._requestSuccessHandler();
    } catch (error: any) {
      connectivityMonitor._requestErrorHandler(error);
    }
  };

  // Trigger checking connection
  await connectivityMonitor._checkConnection();
};
