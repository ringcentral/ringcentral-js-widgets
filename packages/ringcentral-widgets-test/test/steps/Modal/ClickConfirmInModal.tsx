import { screen, fireEvent } from '@testing-library/react';

import { StepFunction } from '../../lib/step';

export const ClickConfirmInModal: StepFunction<{}> = async () => {
  const okButton = screen
    .getByRole('dialog')
    .querySelector('[data-test-automation-id="DialogOKButton"]');
  expect(okButton).toBeInTheDocument();
  if (okButton) {
    fireEvent.click(okButton);
  }
};
