import { StepFunction } from '../../../lib/step';

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
  rcMock.defaultInitMocks.delete(rcMock.getCallLog);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getCallLog(handler, repeat);
  });
};
