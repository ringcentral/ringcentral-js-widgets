import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckCallSettingPageProps {
  tooltipContent?: string | RegExp;
  infoIcon?: boolean;
  titleContent?: string;
}

export const CheckCallSettingPage: StepFunction<CheckCallSettingPageProps> = ({
  titleContent,
  infoIcon,
  tooltipContent,
}) => {
  // check in the calling setting page
  const callSettingInfoElement = screen.getByTestId('callSettingInfo');
  expect(callSettingInfoElement).toBeInTheDocument();

  // check label "Make my calls with"
  if (titleContent) {
    expect(callSettingInfoElement).toHaveTextContent(titleContent);
  }

  // check has icon "i"
  if (infoIcon || tooltipContent) {
    const infoIconElement = callSettingInfoElement.querySelector('span')!;
    expect(infoIconElement).toBeInTheDocument();

    // check tooltip content of "i" icon
    if (tooltipContent) {
      jest.useFakeTimers();
      fireEvent.mouseEnter(infoIconElement);
      jest.advanceTimersByTime(1000);

      expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

      fireEvent.mouseLeave(infoIconElement);
      jest.advanceTimersByTime(1000);
      jest.useRealTimers();

      expect(screen.queryByRole('tooltip')).toBeNull();
    }
  }
};
