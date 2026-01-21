import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckAnswerButton: StepFunction = async () => {
  expect(screen.queryByTestId('answer')).toBeInTheDocument();
};
