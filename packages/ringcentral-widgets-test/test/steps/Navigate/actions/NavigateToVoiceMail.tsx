import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const NavigateToVoiceMail: StepFunction = async () => {
  fireEvent.click(
    (screen.queryByTestId('Messages') ?? screen.queryByTestId('messagesTab'))!,
  );
  fireEvent.click(screen.getByTestId('Voice'));
};
