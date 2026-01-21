import type { StepFunction } from '@ringcentral-integration/test-utils';
import { act, screen } from '@testing-library/react';

export const CheckDeleteModalClosed: StepFunction = () => {
  act(() => {
    const deleteModal = screen.queryByTestId('deleteModal');
    expect(deleteModal).toBeNull();
  });
};
