import { screen, waitFor } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

interface CheckPastingActionProps {
  pasteData: string;
  dataShowAsCard: string[] | null;
  showAtInputBox: string | null;
  searchSuccessful: boolean;
}

export const CheckPastingAction: StepFunction<
  CheckPastingActionProps
> = async ({ pasteData, dataShowAsCard, showAtInputBox, searchSuccessful }) => {
  await waitFor(() => {
    const input = screen.getByTestId('recipientsInput');

    expect(input).toBeInTheDocument();

    showAtInputBox
      ? expect(input).toHaveValue(showAtInputBox)
      : expect(input).not.toHaveValue(pasteData);

    dataShowAsCard && dataShowAsCard.length
      ? dataShowAsCard.every((data) =>
          expect(screen.getByTitle(data)).toBeVisible(),
        )
      : expect(screen.queryByTitle(pasteData)).toBeNull();
  });

  if (searchSuccessful) {
    await waitFor(() => {
      expect(screen.getByTestId('contactDropdownList')).toBeVisible();
    });
  } else {
    expect(screen.queryByTestId('contactDropdownList')).toBeNull();
  }
};
