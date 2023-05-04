import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckAnswerButton: StepFunction = async () => {
  expect(screen.queryByTestId('answer')).toBeInTheDocument();
};
