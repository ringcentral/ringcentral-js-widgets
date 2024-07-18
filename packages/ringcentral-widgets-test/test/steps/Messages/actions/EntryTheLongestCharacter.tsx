import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

interface EntryTheLongestCharacterProps {
  longest: number;
  dataSign: string;
}
export const EntryTheLongestCharacter: StepFunction<
  EntryTheLongestCharacterProps
> = ({ longest, dataSign }) => {
  const selector = screen.getByTestId(dataSign);

  userEvent.type(selector, new Array(longest + 1).join('0'));
};
