import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const TypeMessageInput: StepFunction<{
  content: string;
  containerSelector?: string;
  checkValue?: boolean;
}> = async ({ content, containerSelector, checkValue = true }) => {
  let container: any = screen;
  if (containerSelector) {
    container = within(screen.queryByTestId(containerSelector)!);
  }
  userEvent.type(container.getByTestId('messageInput'), content);

  if (checkValue) {
    expect(container.getByTestId('messageInput')).toHaveValue(content);
  }
};
