import type { StepFunction } from '@ringcentral-integration/test-utils';
import { userEvent } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

interface HoverItemByDataSignProps {
  dataSign: string;
  withinDataSign?: string;
}

export const HoverItemByDataSign: StepFunction<
  HoverItemByDataSignProps
> = async ({ dataSign, withinDataSign }) => {
  let withinElement: HTMLElement | null = null;
  if (withinDataSign) {
    withinElement = screen.getByTestId(withinDataSign);
    expect(withinElement).toBeInTheDocument();
  }
  const container = withinElement ? within(withinElement) : screen;
  userEvent.hover(container.getByTestId(dataSign));
};
