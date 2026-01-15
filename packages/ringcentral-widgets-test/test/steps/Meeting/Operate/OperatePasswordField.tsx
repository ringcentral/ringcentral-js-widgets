import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const FocusOnPasswordField: StepFunction = async () => {
  const inputNode = screen.queryByTestId('password')?.querySelector('input');
  inputNode?.focus();
};

export const BlurPasswordField: StepFunction = async () => {
  const inputNode = screen.queryByTestId('password')?.querySelector('input');
  inputNode?.blur();
};

export const EnterRandomPassword: StepFunction = async () => {
  const password = Math.floor(Math.random() * 10e6).toString();
  return <EnterPassword password={password} />;
};

export const EnterPassword: StepFunction<{ password: string }> = async ({
  password,
}) => {
  const element =
    screen.getByPlaceholderText<HTMLInputElement>('Enter Password');
  fireEvent.change(element, {
    target: { value: password },
  });
};

export const EnterPasswordInPopup: StepFunction<{ password: string }> = async ({
  password,
}) => {
  const modal = screen.getByRole('dialog', { hidden: false });
  const element =
    within(modal).getByPlaceholderText<HTMLInputElement>('Enter Password');
  fireEvent.change(element, {
    target: { value: password },
  });
};
