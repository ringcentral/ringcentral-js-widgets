import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockCallLogProps {
  handler?: (callLog: any) => any;
  repeat?: number;
  isDefaultInit?: boolean;
}

export const MockCallLogs: StepFunction<MockCallLogProps> = async (
  { handler = (mockData) => mockData, repeat = 1, isDefaultInit },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.getCallLog(handler, repeat);
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.getCallLog, () => {
    rcMock.getCallLog(handler, repeat);
  });
};
