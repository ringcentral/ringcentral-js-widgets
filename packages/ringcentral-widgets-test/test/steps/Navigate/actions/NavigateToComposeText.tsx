import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

import { NavigateToMessagesTab } from './NavigateToMessages';

export const NavigateToComposeText: StepFunction = async (props, context) => {
  await NavigateToMessagesTab(props, context);
  fireEvent.click(screen.getByTestId('ComposeText'));
};
