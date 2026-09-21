import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const CheckComposeTestPage: StepFunction = async () => {
  const toRecipient = screen.getByPlaceholderText('Enter name or number');
  expect(toRecipient).toHaveValue('');

  const messageRecipient = screen.getByPlaceholderText('Type message...');
  expect(messageRecipient).toHaveValue('');

  expect(screen.getByTestId('messageButton')).toBeDisabled();

  await waitForRenderReady();

  await whenStateChange(() =>
    expect(screen.queryByTestId('phoneNumber')).not.toBeNull(),
  );

  const selector = screen.getAllByTestId('phoneNumber')[0].querySelector('div');
  if (selector) {
    await userEvent.click(selector);
  } else {
    await userEvent.click(screen.getAllByTestId('phoneNumber')[0]);
  }

  const menuItems = await whenStateChange(() => {
    const items = screen.queryAllByTestId('selectMenuItem', { exact: false });
    expect(items.length).toBeGreaterThan(0);
    return items;
  });

  const list = menuItems[0];
  expect(list).toBeInTheDocument();
  await userEvent.click(list);
};
