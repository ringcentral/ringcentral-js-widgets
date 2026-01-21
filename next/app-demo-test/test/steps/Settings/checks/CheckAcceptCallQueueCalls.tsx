import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckAcceptCallQueueCallsOptions {
  isAccept: boolean;
  isDisabled: boolean;
}

export const CheckAcceptCallQueueCalls: StepFunction<
  CheckAcceptCallQueueCallsOptions
> = async ({ isAccept, isDisabled }) => {
  await waitForRenderReady();

  const element = screen.queryByTestId<HTMLDivElement>('acceptQueueSwitch');
  expect(element).toBeInTheDocument();
  if (element) {
    const switchInput = element.querySelector<HTMLInputElement>(
      'input[data-sign="switch"]',
    );
    expect(switchInput).toBeInTheDocument();
    if (switchInput) {
      const inputIsChecked = switchInput.checked;
      const inputIsDisabled = switchInput.disabled;
      expect(inputIsChecked).toEqual(isAccept);
      expect(inputIsDisabled).toEqual(isDisabled);
    }
  }
};
