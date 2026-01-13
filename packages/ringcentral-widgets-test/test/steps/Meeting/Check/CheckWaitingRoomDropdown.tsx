import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckWaitingRoomDropdown: StepFunction<{
  isDisabled?: boolean;
  defaultValue?: string;
  dataSign?: string;
}> = async ({ isDisabled, defaultValue, dataSign = 'waitingRoom' }) => {
  const dropdown = screen
    .getByTestId(dataSign)
    .querySelector('[role = button]');

  if (isDisabled === true) {
    expect(dropdown).toHaveClass('Mui-disabled');
  } else if (isDisabled === false) {
    expect(dropdown).not.toHaveClass('Mui-disabled');
  }

  if (defaultValue) {
    // waiting room option label is different in new scheduler UI
    const anotherLabel = {
      Everyone: 'For all participants',
      'Anyone outside my company': 'For anyone outside my company',
      'Anyone not signed in': 'For anyone not signed in',
    }[defaultValue];

    try {
      expect(dropdown).toHaveTextContent(defaultValue);
    } catch (e) {
      expect(dropdown).toHaveTextContent(anotherLabel!);
    }
  }
};
