import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckInfoTooltip: StepFunction<{
  tooltipContent: string | RegExp;
}> = async ({ tooltipContent }) => {
  // check if i icon show in the calling setting page
  const infoIcon = document.querySelector('[data-sign="callSettingInfo"] span');
  expect(infoIcon).toBeInTheDocument();

  // check make call with info tooltip
  fireEvent.mouseEnter(infoIcon);

  // check tooltip content
  expect(await screen.findByRole('tooltip')).toHaveTextContent(tooltipContent);

  fireEvent.mouseLeave(infoIcon);
  await waitForElementToBeRemoved(() => screen.getByRole('tooltip'));
};
