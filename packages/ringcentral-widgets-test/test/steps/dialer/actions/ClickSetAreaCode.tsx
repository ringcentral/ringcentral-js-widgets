import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const ClickSetAreaCode: StepFunction = () => {
  fireEvent.click(screen.getByTestId('setAreaCode'));
};
