import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

const DEFAULT_CONTACT_FILTER_OPTIONS = ['All', 'Company', 'Personal'];

export const CheckContactSourceList: StepFunction<{
  options?: string[];
  selectedOption?: string;
}> = async ({ selectedOption, options = DEFAULT_CONTACT_FILTER_OPTIONS }) => {
  const contactSourceList = screen.getByTestId('contactSourceList');
  expect(contactSourceList).toBeInTheDocument();

  if (selectedOption) {
    const container = screen.getByTestId('filterIconContainer');
    expect(container).toHaveAttribute('title', selectedOption);
    expect(within(contactSourceList).getByText(selectedOption)).toHaveAttribute(
      'class',
      expect.stringContaining('Mui-selected'),
    );
  }

  options.forEach((option) => {
    expect(within(contactSourceList).getByText(option)).toBeInTheDocument();
  });
};
