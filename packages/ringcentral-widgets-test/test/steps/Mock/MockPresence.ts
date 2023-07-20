import type { StepFunction } from '../../lib/step';

interface MockPresenceProps {
  repeat?: number;
  isDefaultInit?: boolean;
}

export const MockPresence: StepFunction<MockPresenceProps> = async (
  { repeat = 1, isDefaultInit },
  { rcMock },
) => {
  const setupMock = () => {
    rcMock.getPresence(repeat);
  };

  if (!isDefaultInit) {
    setupMock();
  }

  rcMock.defaultInitMocks.delete(rcMock.getPresence);
  rcMock.defaultInitMocks.add(setupMock);
};
