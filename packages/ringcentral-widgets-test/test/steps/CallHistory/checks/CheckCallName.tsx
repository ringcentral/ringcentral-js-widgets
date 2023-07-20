import { fireEvent, screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckCallName: StepFunction = async ({ expectedValues }: any) => {
  const callItems = screen.getAllByTestId('calls_item_wrapper');
  callItems.forEach(async (item, index) => {
    const expectedValue = expectedValues[index];
    await waitFor(() => {
      const name = item
        .querySelector(`div[data-sign='currentName']`)
        ?.textContent?.replace(/-|\s|\(|\)/g, '');
      expect(expectedValue.name).toContain(name);
    });
    // check dropdown list
    const matchNames = expectedValue.matchNames;
    if (matchNames) {
      const dropdownIcon = item.querySelector('span.arrow_down');
      expect(dropdownIcon).toBeTruthy();
      fireEvent.click(dropdownIcon!);
      await waitFor(
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
