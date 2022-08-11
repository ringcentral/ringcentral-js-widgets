import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const ClickTransfer: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('callActions'));
  expect(screen.getByTestId('transfer')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('transfer'));
};
