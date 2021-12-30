import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const NavigateToSettings: StepFunction = () => {
  fireEvent.click(screen.getByTestId('Settings'));
};
