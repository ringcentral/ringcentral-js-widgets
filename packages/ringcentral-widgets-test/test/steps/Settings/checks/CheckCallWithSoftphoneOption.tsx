import { screen, waitFor, within } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckCallWithSoftphoneOptionDisplay: StepFunction<{
  show: boolean;
  spartanName: string;
}> = async ({ show, spartanName }) => {
  if (show) {
    expect(
      within(screen.getByTestId('callingSetting')).queryByText(spartanName),
    ).toBeInTheDocument();
  } else {
    expect(
      within(screen.getByTestId('callingSetting')).queryByText('Phone'),
    ).not.toBeInTheDocument();
  }
};
