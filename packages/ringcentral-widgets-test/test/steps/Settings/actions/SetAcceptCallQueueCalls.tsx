import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';
import { MockPutPresence } from '../../Mock';

interface SetAcceptCallQueueCallsOptions {
  isAccept: boolean;
}

export const SetAcceptCallQueueCalls: StepFunction<
  SetAcceptCallQueueCallsOptions
> = ({ isAccept }, context) => {
  const element = screen.queryByTestId<HTMLDivElement>('acceptQueueSwitch');
  expect(element).toBeInTheDocument();
  if (element) {
    const switchInput = element.querySelector<HTMLInputElement>(
      'input[data-sign="switch"]',
    );
    expect(switchInput).toBeInTheDocument();
    if (switchInput) {
      const isChecked = switchInput.checked;
      const isDisabled = switchInput.disabled;
      if (!isDisabled && isChecked !== isAccept) {
        MockPutPresence({}, context);
        userEvent.click(switchInput);
      }
    }
  }
};
