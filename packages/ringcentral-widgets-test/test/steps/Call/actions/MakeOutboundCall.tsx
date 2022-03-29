import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';
import { ClickDialButton } from './ClickDialButton';
import { ClickDialNumberButton } from './ClickDialNumberButton';

export const MakeOutboundCall: StepFunction<{
  phoneNumber?: string;
  executeByCallFunction?: boolean;
}> = async (
  { phoneNumber = '+18882556247', executeByCallFunction = true },
  context,
) => {
  if (executeByCallFunction) {
    const { phone } = context;
    const { dialerUI } = phone;
    await dialerUI.call({ phoneNumber });
  } else {
    for (const char of phoneNumber.split('')) {
      await ClickDialNumberButton(char);
    }
    expect(screen.getByTestId('recipientsInput')).toHaveValue(phoneNumber);
    ClickDialButton();
    // await make call successful
    const {
      phone: { callMonitor },
    } = context;
    await new Promise((resolve) => {
      callMonitor.onNewCall(() => {
        resolve(true);
      });
    });
  }
};
