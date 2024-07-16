import { StepFunction, userEvent } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

export const SetVolumeSlider: StepFunction<{
  value: string;
  containerDataSign: string;
}> = async ({ value, containerDataSign }) => {
  const sliderRoot = within(screen.getByTestId(containerDataSign)).getByTestId(
    'slider',
  );
  const volumeSlider = within(sliderRoot).getByRole('slider');

  expect(volumeSlider).toBeInTheDocument();

  sliderRoot.getBoundingClientRect = jest.fn(() => {
    return {
      width: 100,
      height: 10,
      bottom: 10,
      left: 0,
      x: 0,
      y: 0,
      right: 0,
      top: 0,
      toJSON() {},
    };
  });

  // slider: |----|----|----|----|----|----|----|----|----|----|
  // values: 0   10   20   30   40   50   60   70   80   90   100
  // value:       ↑
  // mouse:       ↑

  // Clicking the volume slider to the ${value}% range
  userEvent.click(sliderRoot, { clientX: Number(value) });
  expect(volumeSlider.getAttribute('aria-valuenow')).toBe(value);
};
