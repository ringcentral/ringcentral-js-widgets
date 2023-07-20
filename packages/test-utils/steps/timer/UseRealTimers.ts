import type { StepFunction } from '@ringcentral-integration/crius';

interface UseRealTimersProps {}

export const UseRealTimers: StepFunction<UseRealTimersProps> = async () => {
  jest.useRealTimers();
};
