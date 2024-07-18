import { whenStateChange } from '@ringcentral-integration/core/test';
import {
  screen,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const ClickDialButton = async () => {
  const button = screen.getByTestId('callButton')!;
  await whenStateChange(() => {
    expect(button).toHaveAttribute('aria-disabled', 'false');
  });

  userEvent.click(button);
  await waitForRenderReady();
};
