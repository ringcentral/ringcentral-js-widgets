import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface SearchProps {
  testId: string;
  content: string;
}

export const Search: StepFunction<SearchProps> = async ({
  testId,
  content,
}) => {
  userEvent.type(screen.getByTestId(testId), content);
  await whenStateChange(() => {
    expect(screen.getByTestId(testId)).toHaveValue(content);
  });
};
