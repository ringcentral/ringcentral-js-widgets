import messageSyncBody from '@ringcentral-integration/mock/src/platform/data/messageSync.json';

import type { StepFunction } from '../../../lib/step';

interface MockMessageSyncProps {
  handler?: (messageSync: any) => any;
  isDefaultInit?: boolean;
  useFaker?: boolean;
  repeat?: number;
}

export const MockMessageSync: StepFunction<MockMessageSyncProps> = (
  { handler, isDefaultInit = false, useFaker = false, repeat = 0 },
  { rcMock },
) => {
  const responseFunc = ({ mockData }) => {
    if (!useFaker) {
      return handler?.(messageSyncBody) ?? messageSyncBody;
    }
    return handler?.(mockData) ?? mockData;
  };

  const setupMock = () => {
    rcMock.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-sync',
      200,
      {
        repeat,
        response: responseFunc,
      },
    );
  };

  if (!isDefaultInit) {
    setupMock();
    return;
  }

  rcMock.defaultInitMocks.delete(rcMock.getMessageSync);
  rcMock.defaultInitMocks.add(setupMock);
};

export const MockReadMessage: StepFunction<{
  handler?: (messageSync: any) => any;
  repeat?: number;
}> = ({ handler, repeat = 1 }, { rcMock }) => {
  const responseFunc = ({ mockData }) => {
    return handler?.(mockData) ?? mockData;
  };
  rcMock.put(
    '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store/:messageId',
    200,
    {
      repeat,
      response: responseFunc,
    },
  );
};
