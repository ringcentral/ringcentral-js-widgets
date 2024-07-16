import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

interface ClickContactItemProps {
  index: number;
}

/**
 * Click {index} of matched contacts list
 */
export const ClickContactItem: StepFunction<ClickContactItemProps> = async ({
  index,
}) => {
  expect(screen.getByTestId('contactDropdownList')).toBeVisible();
  const item = screen.getAllByTestId('contactNameSection')[index];
  expect(item).toBeVisible();
  userEvent.click(item);
};
