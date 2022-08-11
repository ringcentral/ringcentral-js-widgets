import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen, within } from '@testing-library/react';
import { StepFunction } from '../../lib/step';

interface CheckContactDropdownListProps {
  name: string;
}

export const CheckContactDropdownList: StepFunction<CheckContactDropdownListProps> =
  async ({ name }) => {
    await waitUntilTo(() => {
      expect(screen.getByTestId('contactDropdownList')).toBeVisible();
      expect(
        within(screen.getAllByTestId('contactNameSection')[0]).getByText(name),
      ).toBeVisible();
    });
  };
