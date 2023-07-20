import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const CheckComposeTestPage: StepFunction = async () => {
  const toRecipient = screen.getByPlaceholderText('Enter name or number');
  expect(toRecipient).toHaveValue('');

  const messageRecipient = screen.getByPlaceholderText('Type message...');
  expect(messageRecipient).toHaveValue('');

  expect(screen.getByTestId('messageButton')).toBeDisabled();

  await waitForRenderReady();

  await waitFor(() =>
    expect(screen.queryByTestId('phoneNumber')).not.toBeNull(),
  );

  const selector = screen.getAllByTestId('phoneNumber')[0].querySelector('div');
  if (selector) userEvent.click(selector);

  await waitFor(() =>
    expect(screen.queryAllByTestId('selectMenuItem')).not.toBeNull(),
  );

  const list = screen.getAllByTestId('selectMenuItem')[0];
  expect(list).toBeInTheDocument();
  userEvent.click(list);
};
