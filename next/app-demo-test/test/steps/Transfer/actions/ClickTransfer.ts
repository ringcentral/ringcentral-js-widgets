import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickTransfer: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('callActions'));
  expect(screen.getByTestId('transfer')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('transfer'));
};
