import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within, waitFor } from '@testing-library/react';

interface CheckRemoveParticipantsProps {
  exists?: boolean;
}

export const CheckRemoveParticipants: StepFunction<
  CheckRemoveParticipantsProps
> = async ({ exists = true }) => {
  if (exists) {
    const removeModal = screen.queryByTestId('removeParticipantModal');
    expect(removeModal).toBeInTheDocument();
    expect(
      within(removeModal!).getByTestId('confirmRemoveButton'),
    ).toBeInTheDocument();
    expect(
      within(removeModal!).getByTestId('cancelRemoveButton'),
    ).toBeInTheDocument();
  } else {
    await waitFor(() => {
      expect(
        screen.queryByTestId('removeParticipantModal'),
      ).not.toBeInTheDocument();
    });
  }
};
