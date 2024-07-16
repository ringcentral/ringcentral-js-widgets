import type { StepFunction } from '../../lib/step';

interface MockActiveCallProps {
  repeat: number;
}

export const MockActiveCall: StepFunction<MockActiveCallProps> = async (
  { repeat },
  { rcMock },
) => {
  rcMock.getActiveCalls(repeat);
};
