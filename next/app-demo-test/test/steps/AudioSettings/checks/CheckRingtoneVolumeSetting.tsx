import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckRingtoneVolumeSetting: StepFunction<{
  value: string;
}> = async ({ value = '50' }) => {
  // default value is 50%
  const label = screen.getByText('Ringtone Volume');
  const volumeSlider = screen.getByRole('slider');
  expect(label).toBeInTheDocument();
  expect(volumeSlider).toBeInTheDocument();
  expect(volumeSlider.getAttribute('aria-valuenow')).toBe(value);
};

export { CheckRingtoneVolumeSetting };
