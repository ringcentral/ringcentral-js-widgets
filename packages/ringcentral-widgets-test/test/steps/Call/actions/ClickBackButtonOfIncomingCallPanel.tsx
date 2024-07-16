import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ClickBackButtonOfIncomingCallPanel = async () => {
  const container = screen.getByTestId('IncomingCallPanel');
  const backButton = within(container).getByTestId('backButton');
  userEvent.click(backButton);
  await waitForRenderReady();
};
