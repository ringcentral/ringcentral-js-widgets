import { DialerView } from '@ringcentral-integration/micro-phone/src/app/views';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const CheckClickToCallButton: StepFunction<{
  phoneNumber: string;
  fromType: string;
}> = async ({ phoneNumber, fromType }, { app }) => {
  const dialerView = app.container.got(DialerView)!;
  const callFunc = jest.spyOn(dialerView, 'call');

  const callButton = screen.queryByTestId('Call');
  expect(callButton).toBeInTheDocument();

  fireEvent.click(callButton as Element);

  await whenStateChange(() => {
    expect(callFunc).toHaveBeenCalledWith({
      recipient: {
        fromType,
        phoneNumber,
      },
    });
  });
};
