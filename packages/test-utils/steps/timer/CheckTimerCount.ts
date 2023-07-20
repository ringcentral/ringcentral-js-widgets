import type { StepFunction } from '@ringcentral-integration/crius';

interface CheckTimerCountProps {
  /**
   * number of expect timer count
   */
  count: number;
}

export const CheckTimerCounts: StepFunction<CheckTimerCountProps> = async ({
  count,
}) => {
  expect(jest.getTimerCount()).toBe(count);
};
