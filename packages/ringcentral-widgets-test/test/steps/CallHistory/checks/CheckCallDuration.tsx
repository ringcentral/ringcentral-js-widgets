import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

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
