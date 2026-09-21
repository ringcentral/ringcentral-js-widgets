import { ConnectivityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockCheckConnectionProps {
  handler: () => Promise<void>;
}

export const MockCheckConnection: StepFunction<
  MockCheckConnectionProps
> = async ({ handler }, { app }) => {
  const connectivityMonitor = app.container.got(ConnectivityMonitor)!;
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
