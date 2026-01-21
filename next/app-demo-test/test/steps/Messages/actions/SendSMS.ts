import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { InputSMS } from './InputSMS';
import type { MessageProps } from './MessageProps.interface';

interface SendSMSProps extends MessageProps {}

export const SendSMS: StepFunction<SendSMSProps> = async (props, context) => {
  await InputSMS(props, context);
  fireEvent.click(screen.getByTestId('messageButton'));
  await waitForRenderReady();
};
