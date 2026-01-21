import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import { screen, within, fireEvent } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const ClickCancelInModal: StepFunction = async () => {
  const cancelButton = await whenStateOrTimerChange(() => {
    const dialog = screen.getByRole('dialog');
    const cancelButton = within(dialog).getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    return cancelButton;
  });

  if (cancelButton) {
    fireEvent.click(cancelButton);
  }
};
