import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { screen, within, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../../../../packages/internal-features-test/test/lib/step';

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
