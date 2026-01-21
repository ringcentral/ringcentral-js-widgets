import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckUnreadCountsProps {
  countAfterAction: string;
}

export const CheckUnreadCounts: StepFunction<CheckUnreadCountsProps> = async ({
  countAfterAction,
}) => {
  await whenStateChange(() => {
    if (Number(countAfterAction) === 0) {
      expect(screen.queryByTestId('noticeCounts')).not.toBeInTheDocument();
    } else {
      expect(screen.getByTestId('noticeCounts').textContent).toEqual(
        countAfterAction,
      );
    }
  });
};
