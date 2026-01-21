import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, within } from '@testing-library/react';

export const ClickConfirmInModal: StepFunction<{
  confirmButtonText?: string;
}> = async ({ confirmButtonText }) => {
  const okButton = await whenStateOrTimerChange(() => {
    const dialog = screen.getByRole('dialog');
    const okButton = within(dialog).getByRole('button', {
      name: confirmButtonText || 'OK',
    });
    expect(okButton).toBeInTheDocument();

    return okButton;
  });

  if (okButton) {
    fireEvent.click(okButton);
  }
};
