import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, within } from '@testing-library/react';

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
  const input = container.getByTestId('recipientsInput');
  fireEvent.focus(input);
  fireEvent.click(input);
};
