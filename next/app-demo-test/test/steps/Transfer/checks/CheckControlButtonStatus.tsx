import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

interface CheckControlButtonStatusProps {
  controlButtons: { name: string[]; status: 'disabled' | 'enabled' };
}

export const CheckControlButtonStatus: StepFunction<
  CheckControlButtonStatusProps
> = async ({ controlButtons }) => {
  const { name, status } = controlButtons;

  await Promise.all(
    name.map((item) =>
      waitFor(() => {
        const button = screen.queryByTestId(item);
        expect(button).toHaveAttribute(
          'aria-disabled',
          status === 'disabled' ? 'true' : 'false',
        );
      }),
    ),
  );
};
