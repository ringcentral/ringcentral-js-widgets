import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';
import { Context } from '../../../interfaces';

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
    .queryByTestId('recipientsChip')
    ?.querySelector('span');
  expect(recipientsChip?.innerHTML).toEqual(phoneNumber);
};
