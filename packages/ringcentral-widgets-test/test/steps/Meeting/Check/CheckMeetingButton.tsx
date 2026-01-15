import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckScheduleButton: StepFunction<{
  isDisabled?: boolean;
  buttonText?: string;
  isRCM?: boolean;
  noExist?: boolean;
}> = async ({ isDisabled, buttonText, isRCM, noExist }) => {
  if (noExist) {
    expect(
      screen.queryByTestId(
        isRCM ? 'meetingScheduleButton' : 'videoScheduleButton',
      ),
    ).not.toBeInTheDocument();
    return;
  }

  const scheduleButton = screen.getByTestId(
    isRCM ? 'meetingScheduleButton' : 'videoScheduleButton',
  );

  if (buttonText) {
    expect(scheduleButton).toHaveTextContent(buttonText);
  }

  if (isDisabled) {
    expect(scheduleButton).toBeDisabled();
  } else {
    expect(scheduleButton).not.toBeDisabled();
  }
};

export const CheckRemoveButton: StepFunction<{
  label?: string;
}> = async ({ label = 'Remove' }) => {
  const removeButton = screen.queryByTestId('removeButton');
  expect(removeButton).toBeInTheDocument();
  expect(removeButton?.textContent).toBe(label);
};
