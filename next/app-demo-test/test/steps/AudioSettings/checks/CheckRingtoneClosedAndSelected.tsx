import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckRingtoneClosedAndSelected: StepFunction<{
  value: string;
}> = async ({ value }) => {
  await whenStateChange(() => {
    const selection = screen.queryByTestId('ringtoneSelection');
    expect(selection).toHaveTextContent(value);
  });
  // check the selection is closed
  const dropdown = screen.queryByRole('listbox');
  if (dropdown) {
    expect(dropdown).not.toBeVisible();
  } else {
    expect(dropdown).not.toBeInTheDocument();
  }
};
