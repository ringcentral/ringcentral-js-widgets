import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

interface CheckUnreadCountsProps {
  countAfterAction: string;
}

export const CheckUnreadCounts: StepFunction<CheckUnreadCountsProps> = async ({
  countAfterAction,
}) => {
  await waitUntilTo(() => {
    if (Number(countAfterAction) === 0) {
      expect(screen.queryByTestId('noticeCounts')).not.toBeInTheDocument();
    } else {
      expect(screen.getByTestId('noticeCounts').textContent).toEqual(
        countAfterAction,
      );
    }
  });
};
