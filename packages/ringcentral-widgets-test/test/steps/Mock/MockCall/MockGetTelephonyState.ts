import { StepFunction } from '../../../lib/step';

interface MockGetTelephonyStateProps {
  handler?: (callLog: any) => any;
  repeat?: number;
  isDefaultInit?: boolean;
  hasActiveCall?: boolean;
}

export const MockGetTelephonyState: StepFunction<MockGetTelephonyStateProps> =
  async (
    {
      handler = (mockData) => mockData,
      hasActiveCall = false,
      repeat = 0,
      isDefaultInit = true,
    },
    { rcMock },
  ) => {
    if (!isDefaultInit) {
      rcMock.getTelephonyState({ hasActiveCall, handler, repeat });
      return;
    }
    rcMock.defaultInitMocks.delete(rcMock.getTelephonyState);
    rcMock.defaultInitMocks.add(() => {
      rcMock.getTelephonyState({ hasActiveCall, handler, repeat });
    });
  };
