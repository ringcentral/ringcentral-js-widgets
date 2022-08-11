import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckContactGroupCaption: StepFunction<{
  caption: string;
}> = async ({ caption }) => {
  expect(screen.getByTestId('currentCaption')).toBeInTheDocument();
  expect(screen.getByTestId('currentCaption')).toHaveTextContent(caption);
};
