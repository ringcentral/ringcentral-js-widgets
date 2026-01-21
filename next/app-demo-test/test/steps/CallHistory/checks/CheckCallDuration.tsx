import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckCallDuration: StepFunction = ({ expectedValues }: any) => {
  const callItems = screen.getAllByTestId('calls_item_wrapper');
  callItems.forEach((item, index) => {
    const expectedValue = expectedValues[index];
    const durationAndTime = item
      .querySelector(`[class="details"]`)
      .textContent.split(' | ');
    const duration = durationAndTime[0];
    expect(duration).toBe(expectedValue.duration);
  });
};
