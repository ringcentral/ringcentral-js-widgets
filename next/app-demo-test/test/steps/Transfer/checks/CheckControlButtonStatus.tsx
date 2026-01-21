import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckControlButtonStatusProps {
  controlButtons: { name: string[]; status: 'disabled' | 'enabled' };
}

export const CheckControlButtonStatus: StepFunction<
  CheckControlButtonStatusProps
> = async ({ controlButtons }) => {
  const { name, status } = controlButtons;

  name.forEach((item) => {
    status === 'disabled'
      ? expect(screen.queryByTestId(item)).toHaveAttribute(
          'aria-disabled',
          'true',
        )
      : expect(screen.queryByTestId(item)).toHaveAttribute(
          'aria-disabled',
          'false',
        );
  });
};
