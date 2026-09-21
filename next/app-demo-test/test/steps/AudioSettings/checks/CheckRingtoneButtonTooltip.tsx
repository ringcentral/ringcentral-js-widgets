import { fireEvent, screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckRingtoneButtonTooltip: StepFunction<{
  button: 'Play' | 'Delete';
  tooltip: 'Play' | 'Delete';
  checkCustom?: boolean;
  customCount?: number;
}> = async ({ button, tooltip, checkCustom = false, customCount }) => {
  // Checking one representative button avoids rendering every tooltip.
  const buttonIndex = checkCustom ? customCount! - 1 : 0;

  const targetButton = screen.getAllByTitle(button)[buttonIndex];
  expect(targetButton).toBeInTheDocument();
  jest.useFakeTimers();
  fireEvent.mouseEnter(targetButton);
  jest.advanceTimersByTime(1000);

  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltip);

  fireEvent.mouseLeave(targetButton);
  jest.advanceTimersByTime(1000);
  jest.useRealTimers();
};
