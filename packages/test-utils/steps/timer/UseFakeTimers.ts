import type { StepFunction } from '@ringcentral-integration/crius';

interface UseFakeTimersProps {}

export const UseFakeTimers: StepFunction<UseFakeTimersProps> = async () => {
  jest.useFakeTimers();
};
