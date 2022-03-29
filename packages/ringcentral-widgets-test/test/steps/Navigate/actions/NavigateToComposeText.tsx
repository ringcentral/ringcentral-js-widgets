import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const NavigateToComposeText: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('Messages'));
  fireEvent.click(screen.getByTestId('ComposeText'));
};
