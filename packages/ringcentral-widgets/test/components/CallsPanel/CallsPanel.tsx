import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface UTActionMenuProps {
  expectShowEntityButton?: boolean;
}

export const UTActionMenu: StepFunction<UTActionMenuProps> = async (
  { expectShowEntityButton = null },
  _,
) => {
  const extendButton = screen.getByTestId('extendButton');
  extendButton.click();

  const entityButton = screen.queryByTestId('View Details');
  if (expectShowEntityButton) {
    expect(entityButton).toBeInTheDocument();
  } else {
    expect(entityButton).not.toBeInTheDocument();
  }
};
