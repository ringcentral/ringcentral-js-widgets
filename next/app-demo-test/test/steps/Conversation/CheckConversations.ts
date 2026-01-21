import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

interface CheckFaxPageCountProps {
  faxPageCount: number;
}

export const CheckFaxPageCount: StepFunction<CheckFaxPageCountProps> = async ({
  faxPageCount,
}) => {
  await whenStateChange(() => {
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
  await whenStateChange(() => {
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
