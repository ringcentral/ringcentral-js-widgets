import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const ClickLogoutButton: StepFunction = async () => {
  fireEvent.click(screen.queryByTestId('logoutButton'));
};
