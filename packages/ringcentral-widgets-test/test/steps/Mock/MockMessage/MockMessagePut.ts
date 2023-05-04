import messageSyncBody from '@ringcentral-integration/mock/src/platform/data/messageSync.json';

import { StepFunction } from '../../../lib/step';

interface MockMessagePutProps {
  handler?: (message: any) => any;
  useFaker?: boolean;
  repeat?: number;
}

export const MockMessagePut: StepFunction<MockMessagePutProps> = async (
  { handler, useFaker = false, repeat = 1 },
  { rcMock },
) => {
  const mockData = {
    ...messageSyncBody.records[0],
    // Notice: new message lastModifiedTime should later than old message's lastModifiedTime
    lastModifiedTime: Date.now(),
  };

  rcMock.putMessageStore(
    !useFaker ? () => handler?.(mockData) : handler,
    repeat,
  );
};
