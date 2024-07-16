import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckPasswordIsValid: StepFunction = async () => {
  const pwdInputDom = screen.queryByTestId('password')?.querySelector('input');
  expect(pwdInputDom?.value).toMatch(/^[A-Za-z0-9]{10}$/);
};

export const CheckPasswordValue: StepFunction<{ password: string }> = async ({
  password,
}) => {
  const pwdInputDom = screen.queryByTestId('password')?.querySelector('input');
  expect(pwdInputDom?.value).toEqual(password);
};

export const CheckPasswordInputNotExist: StepFunction = async () => {
  const pwdInputDom = screen.queryByTestId('password');
  expect(pwdInputDom).not.toBeInTheDocument();
};

export const CheckPasswordPlaceholder: StepFunction = async () => {
  const pwdInputDom = screen.queryByTestId('password')?.querySelector('input');
  expect(pwdInputDom?.placeholder).toBe('Enter Password');
};

export const CheckPasswordEmptyErrorHint: StepFunction = async () => {
  const hintDom = screen.queryByText('Meeting password required');
  expect(hintDom).toBeInTheDocument();
  expect(hintDom?.className).toContain('error');
};

export const CheckPasswordErrorHint: StepFunction = async () => {
  const hintDom = screen.queryByText(
    'Your password must be 1-10 letters and numbers long but cannot contain symbols',
  );
  expect(hintDom).toBeInTheDocument();
  expect(hintDom?.className).toContain('error');
};

export const CheckPasswordHint: StepFunction = async () => {
  const hintDom = screen.queryByText(
    'Your password should be 1-10 letters and numbers long but cannot contain symbols',
  );
  expect(hintDom).toBeInTheDocument();
  expect(hintDom?.className).not.toContain('error');
};

export const CheckPasswordHintNotExist: StepFunction = async () => {
  const hintDom = screen.queryByText(
    'Your password should be 1-10 letters and numbers long but cannot contain symbols',
  );
  expect(hintDom).not.toBeInTheDocument();
};
