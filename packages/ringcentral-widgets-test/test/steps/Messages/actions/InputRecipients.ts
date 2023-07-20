import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { StepFunction } from '../../../lib/step';

export const InputRecipients: StepFunction<{ content: string }> = async ({
  content,
}) => {
  userEvent.type(screen.getByTestId('recipientsInput'), content);
  expect(screen.getByTestId('recipientsInput')).toHaveValue(content);
};
