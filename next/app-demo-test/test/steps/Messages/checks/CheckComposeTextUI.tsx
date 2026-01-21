import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckComposeTextUI: StepFunction = async () => {
  const recipientsInput = screen.queryByTestId('recipientsInput');
  expect(recipientsInput).toBeInTheDocument();

  const messageButton = screen.queryByTestId('messageButton');
  expect(messageButton).toBeInTheDocument();

  const messageInput = screen.queryByTestId('messageInput');
  expect(messageInput).toBeInTheDocument();
};
