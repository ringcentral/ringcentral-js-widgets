import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import userEvent from '@testing-library/user-event';

export const ClickDialButton = async () => {
  userEvent.click(document.querySelector('[data-sign="callButton"] circle'));
  await waitForRenderReady();
};
