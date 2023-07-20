import type { StepFunction } from '@ringcentral-integration/crius';

interface ClearAllTimersProps {}

export const ClearAllTimers: StepFunction<ClearAllTimersProps> = async () => {
  jest.clearAllTimers();
};
