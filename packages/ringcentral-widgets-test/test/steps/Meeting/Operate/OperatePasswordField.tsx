import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
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
  fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
    target: { value: password },
  });
};

export const EnterPassword: StepFunction<{ password: string }> = async ({
  password,
}) => {
  fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
    target: { value: password },
  });
};
