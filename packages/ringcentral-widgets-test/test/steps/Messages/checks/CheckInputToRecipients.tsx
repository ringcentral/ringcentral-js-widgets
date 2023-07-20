import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, within, waitFor } from '@testing-library/react';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckInputToRecipients: StepFunction<{
  recipients: string[];
}> = async ({ recipients }, { phone }) => {
  await waitForRenderReady();
  const recipientsList = screen.queryByTestId('recipientsList');

  expect(recipientsList).not.toBeNull();

  recipients.forEach((recipient) => {
    expect(
      within(recipientsList as HTMLElement).getByTitle(recipient),
    ).toBeInTheDocument();
  });
};
