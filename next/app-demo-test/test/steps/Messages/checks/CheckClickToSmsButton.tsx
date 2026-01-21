import { RouterPlugin } from '@ringcentral-integration/next-core';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const CheckClickToSmsButton: StepFunction<{
  phoneNumber: string;
  appName?: string;
}> = async ({ phoneNumber, appName }, { app }) => {
  const router = app.container.got(RouterPlugin)!;

  const messageButton = screen.queryByTestId('clickToSms');
  expect(messageButton).toBeInTheDocument();

  fireEvent.click(messageButton as Element);

  expect(router.currentPath).toBe('/composeText');

  await waitForRenderReady();

  const recipientsChipTestId =
    appName === 'Salesforce' ? 'recipientsChip' : 'recipientItem';

  const recipientsChip = screen
    .queryByTestId(recipientsChipTestId)
    ?.querySelector('span');
  expect(recipientsChip?.innerHTML).toEqual(phoneNumber);
};
