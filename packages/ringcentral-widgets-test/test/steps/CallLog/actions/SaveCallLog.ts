import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const SaveCallLog: StepFunction = () => {
  fireEvent.click(screen.getByTestId('saveCall'));
};
