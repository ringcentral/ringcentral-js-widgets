import { BrowserLogger } from '@ringcentral-integration/micro-core/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CleanEventsTrackData: StepFunction = async (_, { app }) => {
  const browserLogger = app.container.got(BrowserLogger);

  (browserLogger?.storageTransport as any)['_data'].messages.length = 0;
};
