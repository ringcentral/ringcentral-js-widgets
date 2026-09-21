import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { ClickDialNumberButton } from '../../actions/ClickDialNumberButton';

import { CallButtonBehavior } from './CallButtonBehavior';

export const GoToTransferPage: StepFunction = async () => {
  const transferButton = await whenStateOrTimerChange(() =>
    screen.getByTestId('transfer'),
  );
  fireEvent.click(transferButton);
  await waitForRenderReady();
  await whenStateOrTimerChange(() => {
    expect(screen.getByTestId('recipientsInput')).toBeInTheDocument();
  });
};
export const MakeATransferCall: StepFunction<{
  phoneNumber: string;
  useNewDialBtn?: boolean;
}> = async ({ phoneNumber, useNewDialBtn }) => {
  for (const char of phoneNumber.split('')) {
    await ClickDialNumberButton(char, useNewDialBtn);
  }
  fireEvent.click(screen.getByTestId('transferBtn')!);
  await waitForRenderReady();
};
export const TransferCall: StepFunction<{
  phoneNumber: string;
  callButtonBehaviorType?: string;
  useNewDialBtn?: boolean;
}> = async (
  { phoneNumber, callButtonBehaviorType = 'more', useNewDialBtn = false },
  context,
) => {
  return (
    <>
      <CallButtonBehavior callButtonBehaviorType={callButtonBehaviorType} />
      <GoToTransferPage />
      <MakeATransferCall
        phoneNumber={phoneNumber}
        useNewDialBtn={useNewDialBtn}
      />
    </>
  );
};
