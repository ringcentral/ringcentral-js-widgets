import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckTransferTitle: StepFunction = () => {
  const title = screen.getByTestId('headerTitle');
  expect(title.textContent).toBe('Transfer to');
};
export const CheckBackButton: StepFunction = () => {
  const backButton = screen.getByTestId('backButton');
  expect(backButton).toBeInTheDocument();
};
export const CheckToFiled: StepFunction = () => {
  const toText = `To:`;
  const toPlaceholder = 'Enter name or number';
  expect(screen.getByText(toText)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(toPlaceholder)).toBeInTheDocument();
};
export const CheckTransferButton: StepFunction = () => {
  const transferIcon = `transferBtn`;
  expect(screen.getByTestId(transferIcon)).toBeInTheDocument();
};
export const CheckTransferPage: StepFunction = () => {
  return (
    <>
      <CheckTransferTitle />
      <CheckBackButton />
      <CheckToFiled />
      <CheckTransferButton />
    </>
  );
};
