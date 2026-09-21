import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface EntryTheLongestCharacterProps {
  longest: number;
  dataSign: string;
}
export const EntryTheLongestCharacter: StepFunction<
  EntryTheLongestCharacterProps
> = async ({ longest, dataSign }) => {
  const selector = screen.getByTestId(dataSign);

  await userEvent.type(selector, new Array(longest + 1).join('0'));
  await waitFor(() => {
    expect((selector as HTMLInputElement).value.length).toBe(longest);
  });
};
