import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../lib/step';

interface CheckFaxPageCountProps {
  faxPageCount: number;
}

export const CheckFaxPageCount: StepFunction<CheckFaxPageCountProps> = async ({
  faxPageCount,
}) => {
  await waitUntilTo(() => {
    expect(
      within(screen.getAllByTestId('FaxMessageItem')[0]).getByTestId(
        'msgDetail',
      ),
    ).toHaveTextContent(`${faxPageCount} page`);
  });
};

interface CheckConversationsProps {
  parsedNumber: string;
  name?: string;
  testId: string;
}

export const CheckConversations: StepFunction<
  CheckConversationsProps
> = async ({ parsedNumber, name, testId }) => {
  await waitUntilTo(() => {
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    if (name) {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(
        within(screen.getByTestId(testId)).getByTitle(
          `${name} | RingCentral ${parsedNumber}`,
        ),
      ).toBeInTheDocument();
    } else {
      expect(
        within(screen.getByTestId(testId)).getByTitle(parsedNumber),
      ).toBeVisible();
    }
  });
};
