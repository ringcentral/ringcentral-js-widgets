import type CallLogRecord from '@rc-ex/core/lib/definitions/CallLogRecord';
import type { CallLogSync } from '@ringcentral-integration/mock';
import callLogBody from '@ringcentral-integration/mock/src/platform/data/callLog.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockCallLogSyncProps {
  mockResponse?: CallLogSync | {};
  isDefaultInit?: boolean;
  repeat?: number;
  records?: CallLogRecord[];
}

export const MockCallLogSync: StepFunction<MockCallLogSyncProps> = (
  { records, mockResponse = {}, isDefaultInit = true, repeat = 1 },
  { rcMock },
) => {
  let data = mockResponse || callLogBody;
  if (records) {
    data = {
      ...callLogBody,
      records,
    };
  }

  if (!isDefaultInit) {
    rcMock.getCallLogSync((mockData: CallLogSync) => data || mockData, repeat);
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.getCallLogSync, () => {
    rcMock.getCallLogSync((mockData: CallLogSync) => data ?? mockData, repeat);
  });
};
