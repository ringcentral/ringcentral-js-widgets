import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckCallTime: StepFunction = (
  { expectedValues }: any,
  context,
) => {
  const {
    phone: { dateTimeFormat },
  } = context;

  const callItems = screen.getAllByTestId('calls_item_wrapper');
  callItems.forEach((item, index) => {
    const expectedValue = expectedValues[index];
    const time = dateTimeFormat.formatDateTime({
      utcTimestamp: new Date(expectedValue.time).toUTCString(),
    });
    const durationAndTime = item
      .querySelector(`[class="details"]`)
      .textContent.split(' | ');
    expect(durationAndTime[1]).toBe(time);
  });
};
