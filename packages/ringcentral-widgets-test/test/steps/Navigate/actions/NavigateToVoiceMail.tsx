import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const NavigateToVoiceMail: StepFunction = async () => {
  fireEvent.click(screen.queryByTestId('messagesTab')!);
  fireEvent.click(screen.getByTestId('Voice'));
};
