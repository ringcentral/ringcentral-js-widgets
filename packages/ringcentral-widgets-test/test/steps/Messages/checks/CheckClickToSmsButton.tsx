import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const CheckClickToSmsButton: StepFunction<{
  phoneNumber: string;
}> = async ({ phoneNumber }, context: Context) => {
  const { phone } = context;

  const messageButton = screen.queryByTestId('clickToSms');
  expect(messageButton).toBeInTheDocument();

  fireEvent.click(messageButton as Element);

  expect(phone.routerInteraction.currentPath).toBe('/composeText');

  await waitForRenderReady();

  const recipientsChip = screen
    .queryByTestId('recipientItem')
    ?.querySelector('span');
  expect(recipientsChip?.innerHTML).toEqual(phoneNumber);
};
