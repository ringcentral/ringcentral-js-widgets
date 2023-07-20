import { fireEvent, screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';
import { InputSMS } from './InputSMS';
import type { MessageProps } from './MessageProps.interface';

interface SendSMSProps extends MessageProps {}

export const SendSMS: StepFunction<SendSMSProps> = async (props, context) => {
  await InputSMS(props, context);
  fireEvent.click(screen.getByTestId('messageButton'));
};
