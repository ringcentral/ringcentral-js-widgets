import type { CallLogSync } from '@ringcentral-integration/mock';
import callLogBody from '@ringcentral-integration/mock/src/platform/data/callLog.json';

import type { StepFunction } from '../../../lib/step';

interface MockCallLogSyncProps {
  mockResponse?: CallLogSync | {};
  isDefaultInit?: boolean;
  repeat?: number;
}

export const MockCallLogSync: StepFunction<MockCallLogSyncProps> = (
  { mockResponse = {}, isDefaultInit = true, repeat = 1 },
  { rcMock },
) => {
  const data = mockResponse || callLogBody;
  if (!isDefaultInit) {
    rcMock.getCallLogSync((mockData: CallLogSync) => data || mockData, repeat);
    return;
  }
  rcMock.defaultInitMocks.delete(rcMock.getCallLogSync);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getCallLogSync((mockData: CallLogSync) => data ?? mockData, repeat);
  });
};
