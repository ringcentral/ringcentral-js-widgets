import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckContactGroupCaption: StepFunction<{
  caption: string;
}> = async ({ caption }) => {
  expect(screen.getByTestId('currentCaption')).toBeInTheDocument();
  expect(screen.getByTestId('currentCaption')).toHaveTextContent(caption);
};
