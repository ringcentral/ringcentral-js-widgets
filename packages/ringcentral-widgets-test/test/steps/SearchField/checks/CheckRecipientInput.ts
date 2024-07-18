import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckRecipientInputProps {
  name: string;
}

/**
 * Check value in 'To' field input
 */
export const CheckRecipientInput: StepFunction<
  CheckRecipientInputProps
> = async ({ name }) => {
  const recipientItem = screen.getByTestId('recipientItem') as HTMLElement;

  expect(within(recipientItem).getByTestId('removeBtn')).toBeInTheDocument();
  expect(recipientItem).toHaveTextContent(name);
};
