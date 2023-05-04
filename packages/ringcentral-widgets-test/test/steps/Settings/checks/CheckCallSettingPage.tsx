import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckInfoTooltip: StepFunction<{
  tooltipContent: string | RegExp;
}> = ({ tooltipContent }) => {
  // check if i icon show in the calling setting page
  const infoIcon = document.querySelector('[data-sign="callSettingInfo"] span');
  expect(infoIcon).toBeInTheDocument();

  jest.useFakeTimers();

  fireEvent.mouseEnter(infoIcon);
  jest.runAllTimers();
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  fireEvent.mouseLeave(infoIcon);
  jest.runAllTimers();
  expect(screen.queryByRole('tooltip')).toBeNull();

  jest.useRealTimers();
};
