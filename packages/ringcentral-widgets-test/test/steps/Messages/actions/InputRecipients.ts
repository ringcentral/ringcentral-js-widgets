import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

export const InputRecipients: StepFunction<{
  content: string;
  containerSelector?: string;
}> = async ({ content, containerSelector }) => {
  let container = screen;
  if (containerSelector) {
    container = within(screen.queryByTestId(containerSelector)!);
  }
  userEvent.type(container.getByTestId('recipientsInput'), content);
  expect(container.getByTestId('recipientsInput')).toHaveValue(content);
};
