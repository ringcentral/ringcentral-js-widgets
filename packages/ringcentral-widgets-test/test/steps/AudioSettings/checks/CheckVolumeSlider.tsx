import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckVolumeSlider: StepFunction<{
  value: string;
  label?: string;
  dataSign: string;
}> = async ({ value, label, dataSign }) => {
  const sliderSection = screen.getByTestId(dataSign);
  const volumeSlider = within(sliderSection).getByRole('slider');
  expect(volumeSlider).toBeInTheDocument();

  if (label) {
    expect(within(sliderSection).getByTestId('label')).toHaveTextContent(label);
  }

  expect(volumeSlider.getAttribute('aria-valuenow')).toBe(value);
};
