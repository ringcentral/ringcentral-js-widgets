import { queryByText, screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckTextIcon: StepFunction<{
  disabled: boolean;
}> = ({ disabled = false }) => {
  const textItem = screen.getAllByTestId('clickToSms')[0];
  expect(textItem).toBeInTheDocument();

  const buttonDisabled = textItem.getAttribute('aria-disabled') !== 'false';

  disabled
    ? expect(buttonDisabled).toBeTruthy()
    : expect(buttonDisabled).toBeFalsy();
};
