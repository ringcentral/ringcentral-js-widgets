import { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { screen } from '@testing-library/react';

interface CheckActionMenuProps {
  expectShowEntityButton?: boolean;
  expectShowCallButton?: boolean;
}
interface ICheckActionMenuToolTip {
  tooltip: string;
}

export const CheckActionMenu: StepFunction<CheckActionMenuProps> = async ({
  expectShowEntityButton = null,
  expectShowCallButton = null,
}) => {
  await waitForRenderReady();
  const entityButton = screen.queryByTestId('View Details');
  if (expectShowEntityButton) {
    expect(entityButton).toBeInTheDocument();
  } else {
    expect(entityButton).not.toBeInTheDocument();
  }

  const callButton = screen.queryByTestId('Call');
  if (expectShowCallButton) {
    expect(callButton).toBeInTheDocument();
  } else {
    expect(callButton).not.toBeInTheDocument();
  }
};
export const CheckActionMenuToolTip: StepFunction<ICheckActionMenuToolTip> =
  async ({ tooltip }) => {
    await waitForRenderReady();
    const item = screen.queryByTitle(tooltip);
    expect(item).toBeInTheDocument();
  };
