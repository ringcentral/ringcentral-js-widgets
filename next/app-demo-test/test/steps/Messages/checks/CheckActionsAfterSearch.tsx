import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckActionsAfterSearchProps {
  searchText: string;
  isMatched: boolean;
  matched: string[];
}

export const CheckActionsAfterSearch: StepFunction<
  CheckActionsAfterSearchProps
> = async ({ searchText, isMatched, matched }) => {
  screen.getByDisplayValue(searchText);
  if (isMatched) {
    expect(screen.getByTestId('conversationList')).not.toBeNull();
    matched?.forEach((item) => {
      expect(screen.getByTitle(item, { exact: false })).not.toBeNull();
    });
  } else {
    expect(screen.getByTestId('noMatch').textContent).toEqual(
      'No matching records found',
    );
  }
};
