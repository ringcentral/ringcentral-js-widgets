import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

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
  } else if (showSelectedFilter === false) {
    expect(container.querySelector('svg')).toHaveAttribute(
      'class',
      'filterIconNode iconNoneFill',
    );
  }
};
