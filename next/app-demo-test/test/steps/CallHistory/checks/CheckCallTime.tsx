import { DateTimeFormat } from '@ringcentral-integration/micro-core/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckCallTime: StepFunction = (
  { expectedValues }: any,
  { app },
) => {
  const dateTimeFormat = app.container.got(DateTimeFormat)!;

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
