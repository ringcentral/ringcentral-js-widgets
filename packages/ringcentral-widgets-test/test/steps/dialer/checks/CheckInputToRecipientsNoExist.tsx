import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

/**
 * Check no value in 'To' field input
 */
export const CheckInputToRecipientsNoExist: StepFunction = async () => {
  expect(screen.queryByTestId('recipientItem')).not.toBeInTheDocument();
};
