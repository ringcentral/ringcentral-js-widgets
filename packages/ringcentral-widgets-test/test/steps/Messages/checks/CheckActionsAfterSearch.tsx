import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

interface CheckActionsAfterSearchProps {
  searchText: string;
  isMatched: boolean;
  matched: string[];
}

export const CheckActionsAfterSearch: StepFunction<CheckActionsAfterSearchProps> =
  async ({ searchText, isMatched, matched }, { phone }: any) => {
    screen.getByDisplayValue(searchText);
    if (isMatched) {
      expect(screen.getByTestId('conversationList')).not.toBeNull();
      matched?.forEach((item) => {
        expect(screen.getByTitle(item)).not.toBeNull();
      });
    } else {
      expect(screen.getByTestId('noMatch').textContent).toEqual(
        'No matching records found',
      );
    }
  };
