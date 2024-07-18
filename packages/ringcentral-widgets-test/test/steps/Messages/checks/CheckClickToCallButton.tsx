import { fireEvent, screen } from '@testing-library/react';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const CheckClickToCallButton: StepFunction<{
  phoneNumber: string;
  fromType: string;
}> = async ({ phoneNumber, fromType }, context: Context) => {
  const { phone } = context;
  const callFunc = jest.spyOn(phone.dialerUI, 'call');

  const callButton = screen.queryByTestId('Call');
  expect(callButton).toBeInTheDocument();

  fireEvent.click(callButton as Element);

  expect(callFunc).toHaveBeenCalledWith({
    recipient: {
      fromType,
      phoneNumber,
    },
  });
};
