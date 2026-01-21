import { StepFunction, userEvent } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const ChangeRingtoneVolumeAndSave: StepFunction = async () => {
  const sliderRoot = document.getElementsByClassName('MuiSlider-root')[0];
  const volumeSlider = screen.getByRole('slider');
  const saveButton = screen.getByTestId('saveButton');

  // Save button should be disabled when set to the previously saved value
  expect(saveButton).toHaveAttribute('aria-disabled', 'true');
  expect(volumeSlider).toBeInTheDocument();

  sliderRoot.getBoundingClientRect = jest.fn(() => {
    const rect = {
      width: 100,
      height: 10,
      bottom: 10,
      left: 0,
      x: 0,
      y: 0,
      right: 0,
      top: 0,
    };
    return {
      ...rect,
      toJSON: () => rect,
    };
  });

  // slider: |----|----|----|----|----|----|----|----|----|----|
  // values: 0   10   20   30   40   50   60   70   80   90   100
  // value:       ↑
  // mouse:       ↑

  // Clicking the volume slider to the 10% range
  userEvent.click(sliderRoot, { clientX: 10 });
  expect(volumeSlider.getAttribute('aria-valuenow')).toBe('10');
  // Save button should get enabled when value is changed
  expect(saveButton).toHaveAttribute('aria-disabled', 'false');
  userEvent.click(saveButton);
  // Save button should be disabled again after saving the new value
  expect(saveButton).toHaveAttribute('aria-disabled', 'true');
};

export { ChangeRingtoneVolumeAndSave };
