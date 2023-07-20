import type { StepFunction } from '@ringcentral-integration/crius';

interface RunAllTimersProps {}

export const RunAllTimers: StepFunction<RunAllTimersProps> = async () => {
  jest.runAllTimers();
};
