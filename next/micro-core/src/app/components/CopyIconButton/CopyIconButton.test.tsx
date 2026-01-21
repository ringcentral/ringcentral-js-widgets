import { leaveTooltipHost } from '@ringcentral-integration/app-demo-test/test/steps/Tooltip';
import { renderViewPanel } from '@ringcentral-integration/app-demo-test/test/steps/renderView';
import {
  screen,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import writeText from 'copy-to-clipboard';
import React from 'react';

import { CopyIconButton } from './CopyIconButton';

jest.mock('copy-to-clipboard', () =>
  jest.fn().mockImplementation((input) => {
    return true;
  }),
);

describe('CopyIconButton render', () => {
  it.each`
    disappearTime
    ${3000}
    ${1000}
    ${500}
  `('Copied will be show {disappearTime}ms', async ({ disappearTime }) => {
    await renderViewPanel(
      <CopyIconButton text="Example" disappearTime={disappearTime} />,
    );
    const actionButton = screen.queryByLabelText('Copy');
    expect(actionButton).toBeInTheDocument();

    expect(actionButton!.getAttribute('title')).toContain('Copy');

    jest.useFakeTimers();
    // click
    userEvent.click(actionButton!);

    const copied = screen.queryByRole('button', {
      description: 'Copied',
    });

    expect(copied).toBeInTheDocument();

    jest.advanceTimersByTime(disappearTime);

    await waitForRenderReady();

    expect(
      screen.queryByRole('button', {
        description: 'Copied',
      }),
    ).not.toBeInTheDocument();

    const copyButton = screen.queryByRole('button', {
      description: 'Copy',
    });

    expect(copyButton).toBeInTheDocument();

    jest.useRealTimers();
    expect(writeText).toHaveBeenCalledWith('Example');

    leaveTooltipHost(copyButton!);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
