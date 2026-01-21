import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

interface CheckSectionByDataSignProps {
  dataSign: string;
  withinDataSign?: string;
  isShow?: boolean;
}
export const CheckSectionByDataSign: StepFunction<
  CheckSectionByDataSignProps
> = ({ dataSign, withinDataSign, isShow = true }) => {
  let withinElement: HTMLElement | null = null;
  if (withinDataSign) {
    withinElement = screen.getByTestId(withinDataSign);
    expect(withinElement).toBeInTheDocument();
  }
  const container = withinElement ? within(withinElement) : screen;
  if (isShow) {
    expect(container.getByTestId(dataSign)).toBeInTheDocument();
  } else {
    expect(container.queryByTestId(dataSign)).not.toBeInTheDocument();
  }
};
