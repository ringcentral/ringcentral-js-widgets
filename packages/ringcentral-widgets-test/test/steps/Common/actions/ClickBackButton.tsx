import { fireEvent, screen, getByTestId } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const ClickBackButton: StepFunction = () => {
  fireEvent.click(screen.getByTestId('backButton'));
};
