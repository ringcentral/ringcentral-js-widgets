import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen, fireEvent } from '@testing-library/react';

import type { StepFunction } from '../../lib/step';

export const ClickConfirmInModal: StepFunction = async () => {
  const okButton = await whenStateOrTimerChange(() => {
    const okButton = screen
      .getByRole('dialog')
      .querySelector('[data-test-automation-id="DialogOKButton"]');
    expect(okButton).toBeInTheDocument();

    return okButton;
  });

  if (okButton) {
    fireEvent.click(okButton);
  }
};
