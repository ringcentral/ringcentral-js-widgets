import { StepFunction } from '../../lib/step';

interface MockPresenceProps {
  repeat?: number;
  isDefaultInit?: boolean;
}

export const MockPresence: StepFunction<MockPresenceProps> = async (
  { repeat = 1, isDefaultInit },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.getPresence(repeat);
  }
  rcMock.defaultInitMocks.delete(rcMock.getPresence);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getPresence(repeat);
  });
};
