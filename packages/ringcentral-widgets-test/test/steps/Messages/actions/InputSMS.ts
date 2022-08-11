import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';
import { MessageProps } from './MessageProps.interface';

interface InputSMSProps extends MessageProps {}

export const InputSMS: StepFunction<InputSMSProps> = async ({
  phoneNumber,
  textMessage = 'test message',
}) => {
  act(() => {
    fireEvent.change(screen.getByTestId('recipientsInput'), {
      target: { value: phoneNumber },
    });
    fireEvent.change(screen.getByTestId('messageInput'), {
      target: { value: textMessage },
    });
  });

  expect(screen.getByTestId('recipientsInput')).toHaveValue(phoneNumber);
  expect(screen.getByTestId('messageInput')).toHaveValue(textMessage);

  await waitFor(() => {
    expect(screen.getByTestId('messageButton')).not.toBeDisabled();
  });
};
