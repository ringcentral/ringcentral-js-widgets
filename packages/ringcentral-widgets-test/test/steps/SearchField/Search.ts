import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../lib/step';

interface SearchProps {
  testId: string;
  content: string;
}

export const Search: StepFunction<SearchProps> = async ({
  testId,
  content,
}) => {
  userEvent.type(screen.getByTestId(testId), content);
  await waitUntilTo(() => {
    expect(screen.getByTestId(testId)).toHaveValue(content);
  });
};
