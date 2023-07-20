import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ClickDialNumberButton } from '../../actions/ClickDialNumberButton';
import { CallButtonBehavior } from './CallButtonBehavior';

export const GoToTransferPage: StepFunction = () => {
  const transferButton = screen.getByTestId('transfer');
  fireEvent.click(transferButton);
};
export const MakeATransferCall: StepFunction<{
  phoneNumber: string;
}> = async ({ phoneNumber }) => {
  for (const char of phoneNumber.split('')) {
    await ClickDialNumberButton(char);
  }
  fireEvent.click(document.querySelector("[data-sign='transferBtn'] circle"));
};
export const TransferCall: StepFunction<{
  phoneNumber: string;
  callButtonBehaviorType?: string;
}> = async ({ phoneNumber, callButtonBehaviorType = 'more' }, context) => {
  return (
    <>
      <CallButtonBehavior callButtonBehaviorType={callButtonBehaviorType} />
      <GoToTransferPage />
      <MakeATransferCall phoneNumber={phoneNumber} />
    </>
  );
};
