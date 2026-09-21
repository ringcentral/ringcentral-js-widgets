import type { StepFunction } from '@ringcentral-integration/crius';
import { act } from '@testing-library/react';

interface AdvanceTimersByTimeProps {
  ms: number;
}

export const AdvanceTimersByTime: StepFunction<
  AdvanceTimersByTimeProps
> = async ({ ms }) => {
  await act(async () => {
    jest.advanceTimersByTime(ms);
    await Promise.resolve();
  });
};
