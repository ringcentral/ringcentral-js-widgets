import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Focus on 'To' field input
 */
export const FocusOnRecipients: StepFunction<{
  containerSelector?: string;
}> = async ({ containerSelector }) => {
  let container = screen;
  if (containerSelector) {
    container = within(screen.queryByTestId(containerSelector)!);
  }
  userEvent.click(container.getByTestId('recipientsInput'));
};
