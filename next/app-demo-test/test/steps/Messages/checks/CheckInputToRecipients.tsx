import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

export const CheckInputToRecipients: StepFunction<{
  recipients: string[];
}> = async ({ recipients }) => {
  await waitForRenderReady();
  const recipientsList = screen.queryByTestId('recipientsList');

  expect(recipientsList).not.toBeNull();

  recipients.forEach((recipient) => {
    expect(
      within(recipientsList as HTMLElement).getByTitle(recipient),
    ).toBeInTheDocument();
  });
};
