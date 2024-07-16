import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

/**
 * Click save button on Settings calling options page
 */
export const ClickSaveButton: StepFunction = () => {
  userEvent.click(screen.getByText('Save'));
};
