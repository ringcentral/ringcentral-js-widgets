import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckScheduleButton: StepFunction<{
  isDisabled?: boolean;
  buttonText?: string;
  isRCM?: boolean;
}> = async ({ isDisabled, buttonText, isRCM }) => {
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

export const CheckRemoveButton: StepFunction = async () => {
  const removeButton = screen.queryByTestId('removeButton');
  expect(removeButton).toBeInTheDocument();
  expect(removeButton?.textContent).toBe('Remove');
};
