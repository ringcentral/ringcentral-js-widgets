import { DEFAULT_RINGTONE_LIST } from '@ringcentral-integration/micro-phone/src/app/services';
import { fireEvent, screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckRingtoneButtonTooltip: StepFunction<{
  button: 'Play' | 'Delete';
  tooltip: 'Play' | 'Delete';
  checkCustom?: boolean;
  customCount?: number;
}> = async ({ button, tooltip, checkCustom = false, customCount }) => {
  // it take times to hover the play button and render tooltip, so we get a random index to check
  const randomIndex = !checkCustom
    ? Math.floor(Math.random() * DEFAULT_RINGTONE_LIST.length - 1)
    : Math.ceil(Math.random() * customCount! - 1);

  const playButton = screen.getAllByTitle(button)[randomIndex];
  expect(playButton).toBeInTheDocument();
  jest.useFakeTimers();
  fireEvent.mouseEnter(playButton);
  jest.advanceTimersByTime(1000);

  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltip);

  fireEvent.mouseLeave(playButton);
  jest.advanceTimersByTime(1000);
  jest.useRealTimers();
};
