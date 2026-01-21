import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import type { MessageProps } from './MessageProps.interface';

interface InputSMSProps extends MessageProps {}

export const InputSMS: StepFunction<InputSMSProps> = async ({
  phoneNumber = '+18883221914',
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

  try {
    await waitFor(() => {
      expect(screen.getByTestId('messageButton')).not.toBeDisabled();
    });
  } catch (error) {
    await whenStateChange(() => {
      expect(screen.getByTestId('messageButton')).not.toBeDisabled();
    });
  }
};
