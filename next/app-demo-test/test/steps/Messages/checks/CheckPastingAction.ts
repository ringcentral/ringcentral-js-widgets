import {
  whenStateChange,
  whenStateOrTimerChange,
} from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckPastingActionProps {
  pasteData: string;
  dataShowAsCard: string[] | null;
  showAtInputBox: string | null;
  searchSuccessful: boolean;
  userNewSearchList?: boolean;
  showSearchTab?: boolean;
}

export const CheckPastingAction: StepFunction<
  CheckPastingActionProps
> = async ({
  pasteData,
  dataShowAsCard,
  showAtInputBox,
  showSearchTab,
  searchSuccessful,
  userNewSearchList,
}) => {
  await whenStateOrTimerChange(() => {
    const input = screen.getByTestId('recipientsInput');
    expect(input).toBeInTheDocument();
    showAtInputBox
      ? expect(input).toHaveValue(showAtInputBox)
      : expect(input).not.toHaveValue(pasteData);
  });
  await whenStateChange(() => {
    dataShowAsCard && dataShowAsCard.length
      ? dataShowAsCard.every((data) =>
          expect(screen.getByText(data)).toBeVisible(),
        )
      : expect(screen.queryByText(pasteData)).toBeNull();
  });

  if (userNewSearchList) {
    if (searchSuccessful) {
      await whenStateChange(() => {
        expect(screen.getByTestId('personalContactTabName')).toHaveTextContent(
          'Personal (1)',
        );
      });
    } else if (showSearchTab) {
      await whenStateChange(() => {
        expect(screen.getByTestId('personalContactTabName')).toHaveTextContent(
          'Personal (0)',
        );
      });
    } else {
      expect(screen.queryByTestId('personalContactTabName')).toBeNull();
    }
  } else {
    if (searchSuccessful) {
      await whenStateChange(() => {
        expect(screen.getByTestId('contactDropdownList')).toBeVisible();
      });
    } else {
      expect(screen.queryByTestId('contactDropdownList')).toBeNull();
    }
  }
};
