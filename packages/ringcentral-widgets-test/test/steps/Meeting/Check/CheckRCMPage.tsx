import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckRCMPassword: StepFunction<{
  password?: string;
}> = async ({ password }) => {
  const input = screen.getByPlaceholderText('Enter Password');
  if (password) {
    expect(input.getAttribute('value')).toEqual(password);
  } else {
    expect(input.getAttribute('value')).toMatch(/\d{6}/);
  }
};

export const CheckRCMPasswordNoExist: StepFunction = async () => {
  const inputBox = screen.queryByPlaceholderText('Enter Password');
  expect(inputBox).not.toBeInTheDocument();
};

export const RcmOptionIsLocked: StepFunction<{
  dataSign: string;
  isLocked: boolean;
}> = async ({ dataSign, isLocked }) => {
  await whenStateOrTimerChange(() => {
    const lockIcon = screen.queryByTestId(`${dataSign}_lock`);

    if (isLocked) {
      expect(lockIcon).toBeInTheDocument();
    } else {
      expect(lockIcon).not.toBeInTheDocument();
    }
  });
};

export const CheckDropDownValue: StepFunction<{
  dataSign: string;
  value: string;
}> = async ({ dataSign, value }) => {
  const inputNode = screen
    .getByTestId(dataSign)
    .querySelector('[role = button]');

  expect(inputNode).toHaveTextContent(value);
};

export const CheckRecurringOption: StepFunction<{
  isShown: boolean;
}> = async ({ isShown }) => {
  const recurringEl = screen.getByTestId('recurringMeeting');
  if (isShown) {
    expect(recurringEl).not.toBeNull();
  } else {
    expect(recurringEl).toBeNull();
  }
};
