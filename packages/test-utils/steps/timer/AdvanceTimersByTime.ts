import { StepFunction } from '@ringcentral-integration/crius';

interface AdvanceTimersByTimeProps {
  ms: number;
}

export const AdvanceTimersByTime: StepFunction<AdvanceTimersByTimeProps> =
  async ({ ms }) => {
    jest.advanceTimersByTime(ms);
  };
