import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockActiveCallProps {
  repeat: number;
}

export const MockActiveCall: StepFunction<MockActiveCallProps> = async (
  { repeat },
  { rcMock },
) => {
  rcMock.getActiveCalls(repeat);
};
