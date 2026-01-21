import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const InputRecipients: StepFunction<{
  content: string;
  containerSelector?: string;
  checkValue?: boolean;
}> = async ({ content, containerSelector, checkValue = true }) => {
  let container = screen;
  if (containerSelector) {
    container = within(screen.queryByTestId(containerSelector)!);
  }
  userEvent.type(container.getByTestId('recipientsInput'), content);
  if (checkValue) {
    expect(container.getByTestId('recipientsInput')).toHaveValue(content);
  }
};
