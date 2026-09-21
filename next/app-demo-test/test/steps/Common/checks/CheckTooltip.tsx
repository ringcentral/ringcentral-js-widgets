import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { hoverTooltipHost, leaveTooltipHost } from '../../Tooltip';

const unhoverWithFallback = (host: HTMLElement) => {
  try {
    userEvent.unhover(host);
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !error.message.includes('pointer-events set to "none"')
    ) {
      throw error;
    }
    fireEvent.mouseOut(host);
  }
};

const isTooltipTrigger = (element: HTMLElement, tooltip: string) => {
  return (
    element.getAttribute('aria-label') === tooltip ||
    element.getAttribute('title') === tooltip
  );
};

const findTooltipTrigger = (host: HTMLElement, tooltip: string) => {
  let current: HTMLElement | null = host;

  while (current) {
    if (isTooltipTrigger(current, tooltip)) {
      return current;
    }

    const descendant = Array.from(
      current.querySelectorAll<HTMLElement>('[aria-label], [title]'),
    ).find((element) => isTooltipTrigger(element, tooltip));

    if (descendant) {
      return descendant;
    }

    current = current.parentElement;
  }

  return host;
};

const getTooltipTriggerCandidates = (host: HTMLElement, tooltip: string) => {
  const candidates: HTMLElement[] = [];
  const addCandidate = (element: HTMLElement | null) => {
    if (element && !candidates.includes(element)) {
      candidates.push(element);
    }
  };

  addCandidate(findTooltipTrigger(host, tooltip));
  addCandidate(host);

  let current = host.parentElement;
  while (current) {
    addCandidate(current);
    current = current.parentElement;
  }

  host
    .querySelectorAll<HTMLElement>('[aria-label], [title]')
    .forEach(addCandidate);

  return candidates;
};

const expectTooltip = async (tooltip: string) => {
  let allTooltipContext: string[] = [];

  try {
    await waitFor(() => {
      allTooltipContext = screen
        .queryAllByRole('tooltip')
        .map((item) => item.textContent!);
      expect(allTooltipContext).toContain(tooltip);
    });
  } catch (error) {
    throw new Error(
      `Tooltip not found, "${tooltip}",

found: ${allTooltipContext.join(', ')}`,
    );
  }
};

const leaveAndUnhover = (host: HTMLElement) => {
  leaveTooltipHost(host);
  unhoverWithFallback(host);
};

/**
 * Check element tooltip
 * @param element data sign of the target element
 * @param tooltip tooltip text
 * @param browserTooltip whether the tooltip is a browser builtin tooltip
 */
export const CheckTooltip: StepFunction<{
  dataSign?: string;
  tooltip: string;
  browserTooltip?: boolean;
}> = async ({ dataSign, tooltip, browserTooltip = false }) => {
  if (!browserTooltip) {
    if (!dataSign) {
      throw new Error('dataSign is required');
    }

    const host = screen.getByTestId(dataSign);
    const triggerHosts = getTooltipTriggerCandidates(host, tooltip);

    let lastError: unknown;
    for (const triggerHost of triggerHosts) {
      hoverTooltipHost(triggerHost);

      try {
        await expectTooltip(tooltip);
        leaveAndUnhover(triggerHost);
        return;
      } catch (error) {
        lastError = error;
        leaveAndUnhover(triggerHost);
      }
    }

    throw lastError;
  } else {
    const elements = screen.getAllByTitle(tooltip);
    expect(elements[0]).toBeInTheDocument();
  }
};
