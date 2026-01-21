import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  screen,
  StepFunction,
  within,
} from '@ringcentral-integration/test-utils';

interface CheckContactDropdownListProps {
  name: string;
}

/**
 * Check matched contacts list should contains {name}
 */
export const CheckContactDropdownList: StepFunction<
  CheckContactDropdownListProps
> = async ({ name }) => {
  await whenStateChange(() => {
    expect(screen.getByTestId('contactDropdownList')).toBeVisible();
    expect(
      within(screen.getAllByTestId('contactNameSection')[0]).getByText(name),
    ).toBeVisible();
  });
};
