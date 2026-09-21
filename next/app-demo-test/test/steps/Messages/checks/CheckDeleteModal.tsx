import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckDeleteModalClosed: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    const deleteModal = screen.queryByTestId('deleteModal');
    expect(deleteModal).toBeNull();
  });
};
