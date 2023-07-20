import type { StepFunction } from '@ringcentral-integration/crius';

interface RunOnlyPendingTimersProps {}

export const RunOnlyPendingTimers: StepFunction<RunOnlyPendingTimersProps> =
  async () => {
    jest.runOnlyPendingTimers();
  };
