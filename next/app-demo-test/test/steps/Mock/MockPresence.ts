import type { StepFunction } from '@ringcentral-integration/test-utils';

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

  rcMock.replaceDefaultInitMock(rcMock.getPresence, setupMock);
};
