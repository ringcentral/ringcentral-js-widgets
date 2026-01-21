import { screen, StepFunction } from '@ringcentral-integration/test-utils';
import userEvent from '@testing-library/user-event';

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
