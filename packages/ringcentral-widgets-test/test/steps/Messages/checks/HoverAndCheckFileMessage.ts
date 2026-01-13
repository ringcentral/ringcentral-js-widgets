import {
  within,
  screen,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

import { hoverTooltipHost, leaveTooltipHost } from '../../Tooltip';

interface HoverAndCheckFileMessageProps {
  filename: string;
  index?: number;
  type?: 'Inbound' | 'Outbound';
}

export const HoverAndCheckFileMessage: StepFunction<
  HoverAndCheckFileMessageProps
> = async ({ filename, index = 0, type = 'Inbound' }) => {
  const fileElement = screen.queryAllByTestId(`${type}Attachment`)[index];
  expect(fileElement).toBeInTheDocument();

  // file icon
  expect(fileElement.querySelector('.file_border')).toBeInTheDocument();

  // check filename & download button
  expect(within(fileElement).queryByTestId('file-full-name')?.textContent).toBe(
    filename,
  );
  const downloadButton = within(fileElement).queryByTestId('download');
  expect(downloadButton).toBeInTheDocument();

  // check tooltip
  hoverTooltipHost(downloadButton!);
  const haveTooltip = screen.getAllByRole('tooltip').some((item) => {
    return item.textContent === 'Download';
  });
  expect(haveTooltip).toBeTruthy();
  leaveTooltipHost(downloadButton!);
};
