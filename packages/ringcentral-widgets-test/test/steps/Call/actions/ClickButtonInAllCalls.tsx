import { within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StepFunction } from '../../../lib/step';

interface ClickButtonInAllCallsProps {
  callButton: string;
  callSection: 'Call on Hold';
}

export const ClickButtonInAllCalls: StepFunction<
  ClickButtonInAllCallsProps
> = ({ callButton, callSection }) => {
  const callsList = screen.queryAllByTestId('callList');
  callsList.forEach((list) => {
    if (within(list).queryByText(callSection)) {
      const button = within(list)
        .getByTestId(callButton)
        .querySelector('circle')!;
      userEvent.click(button);
    }
  });
};
