import { screen, within } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckContactSourceList: StepFunction<{
  thirdPartyOption?: string;
  selectedOption?: string;
}> = async ({ thirdPartyOption, selectedOption }) => {
  const contactSourceList = screen.getByTestId('contactSourceList');
  expect(contactSourceList).toBeInTheDocument();

  expect(within(contactSourceList).getByText('All')).toBeInTheDocument();
  expect(within(contactSourceList).getByText('Company')).toBeInTheDocument();
  expect(within(contactSourceList).getByText('Personal')).toBeInTheDocument();

  if (selectedOption) {
    const container = screen.getByTestId('filterIconContainer');
    expect(container).toHaveAttribute('title', selectedOption);
    expect(within(contactSourceList).getByText(selectedOption)).toHaveAttribute(
      'class',
      expect.stringContaining('Mui-selected'),
    );
  }

  if (thirdPartyOption) {
    expect(
      within(contactSourceList).getByText(thirdPartyOption),
    ).toBeInTheDocument();
  }
};
