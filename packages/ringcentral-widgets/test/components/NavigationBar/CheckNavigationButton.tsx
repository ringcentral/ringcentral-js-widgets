import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../lib/step';

export const CheckNavigationButton: StepFunction<{
  id: string;
  tooltip: string;
}> = async ({ id, tooltip }) => {
  const navigationBtn = screen.getByTestId(id);

  /** Tooltips */
  // tooltip won't show before hover the button
  expect(screen.queryByText(tooltip)).toBeNull();

  fireEvent.mouseEnter(navigationBtn);
  const tooltipItem = await screen.findByText(tooltip);
  expect(tooltipItem).not.toBeNull();
};
