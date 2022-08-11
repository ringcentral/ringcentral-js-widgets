import { screen } from '@testing-library/react';
import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { StepFunction } from '@ringcentral-integration/test-utils';

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
