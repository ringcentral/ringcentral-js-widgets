import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckContactSourceFilterButton: StepFunction<{
  tooltip: string;
  showSelectedFilter: boolean;
}> = async ({ tooltip, showSelectedFilter }) => {
  const container = screen.getByTestId('filterIconContainer');
  expect(container).toHaveAttribute('title', tooltip);

  if (showSelectedFilter) {
    expect(container.querySelector('svg')).not.toHaveAttribute(
      'class',
      'iconNoneFill',
    );
  }
};
