import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const ClickLogoutButton: StepFunction = () => {
  fireEvent.click(screen.getByTestId('logoutButton'));
};
