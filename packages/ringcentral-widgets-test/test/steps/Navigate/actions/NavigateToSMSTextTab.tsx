import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';
import { NavigateToMessagesTab } from './NavigateToMessages';

export const NavigateToSMSTextTab: StepFunction = async (props, context) => {
  await NavigateToMessagesTab(props, context);
  fireEvent.click(screen.getByTestId('Text'));
};
