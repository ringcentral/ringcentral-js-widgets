import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

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
