import { screen, fireEvent } from '@testing-library/react';
import { waitUntilTo } from '@ringcentral-integration/commons/utils';

import { StepFunction } from '../../../lib/step';

export const CheckCallName: StepFunction = async ({ expectedValues }: any) => {
  const callItems = screen.getAllByTestId('calls_item_wrapper');
  callItems.forEach(async (item, index) => {
    const expectedValue = expectedValues[index];
    const name = item
      .querySelector(`div[data-sign='currentName']`)
      .textContent?.replace(/-|\s|\(|\)/g, '');
    expect(expectedValue.name).toContain(name);

    // check dropdown list
    const matchNames = expectedValue.matchNames;
    if (matchNames) {
      const dropdownIcon = item.querySelector('span.arrow_down');
      expect(dropdownIcon).toBeTruthy();
      fireEvent.click(dropdownIcon);
      await waitUntilTo(
        () => {
          expect(screen.getByTitle(expectedValue.name)).toBeTruthy();
        },
        { timeout: 10e3 },
      );
      matchNames.forEach(async (name: string) => {
        expect(screen.getByTitle(name)).toBeTruthy();
      });
    }
  });
};
