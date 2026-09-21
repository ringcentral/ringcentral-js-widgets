import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import { AudioSettings } from '@ringcentral-integration/micro-phone/src/app/services';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const ChangeRingtoneVolumeAndSave: StepFunction = async (_, { app }) => {
  const volumeSlider = screen.getByRole('slider');
  const saveButton = screen.getByTestId('saveButton');
  const audioSettings = app.container.got(AudioSettings)!;

  // Save button should be disabled when set to the previously saved value
  expect(saveButton).toHaveAttribute('aria-disabled', 'true');
  expect(volumeSlider).toBeInTheDocument();

  await audioSettings.setData({ ringtoneVolume: 0.1 });
  await whenStateOrTimerChange(() => {
    expect(volumeSlider.getAttribute('aria-valuenow')).toBe('10');
  });
  await whenStateOrTimerChange(() => {
    expect(saveButton).toHaveAttribute('aria-disabled', 'true');
  });
};

export { ChangeRingtoneVolumeAndSave };
