import {
  userEvent,
  screen,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

import { hoverTooltipHost, leaveTooltipHost } from '../../Tooltip';

interface HoverAndCheckImageMessageProps {
  filename: string;
  index?: number;
  isTif?: boolean;
}

export const HoverAndCheckImageMessage: StepFunction<
  HoverAndCheckImageMessageProps
> = async ({ filename, index = 0, isTif = false }) => {
  let imgElement;
  // currently, jest did not support canvas rendering
  if (!isTif) {
    imgElement = screen.getByRole('img', { name: filename });
    expect(imgElement).toBeInTheDocument();
    // check filename & download button
    userEvent.hover(imgElement);
  }

  expect(screen.getAllByTestId('image-toolbar')[index]).toBeVisible();
  expect(screen.getAllByTestId('image-name')[index]).toHaveTextContent(
    filename,
  );
  expect(screen.getAllByTestId('download')[index]).toBeInTheDocument();

  // check tooltip
  hoverTooltipHost(screen.getAllByTestId('download')[index]);
  const haveTooltip = screen.getAllByRole('tooltip').some((item) => {
    return item.textContent === 'Download';
  });
  expect(haveTooltip).toBeTruthy();
  leaveTooltipHost(screen.getAllByTestId('download')[index]);

  imgElement && userEvent.unhover(imgElement);
};
