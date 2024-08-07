import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const ClickChangePMIAlert: StepFunction = async () => {
  screen.getByTestId('setPmiConfirm').click();
};

export const ClickRCMScheduleButton: StepFunction = async () => {
  jest.useFakeTimers();

  const scheduleButton = screen.getByTestId('meetingScheduleButton');
  scheduleButton.click();

  jest.advanceTimersByTime(5e3);
  await waitForRenderReady();
  jest.useRealTimers();
};
