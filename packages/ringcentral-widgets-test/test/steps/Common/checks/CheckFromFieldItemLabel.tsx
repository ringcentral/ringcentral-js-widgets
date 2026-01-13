import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckFromFieldItemLabel: StepFunction<{
  phoneNumber: string;
  label: string;
  dataSign?: string;
}> = async ({ phoneNumber, label, dataSign = 'dropdownSelect' }) => {
  const selection = screen.getByTestId(dataSign);
  let optionNotFound = true;
  within(selection)
    .getAllByTestId('selectMenuItem')
    .forEach((item) => {
      if (
        within(item).queryByTestId('phoneNumber')?.textContent === phoneNumber
      ) {
        optionNotFound = false;
        expect(item.querySelector('.usageType')?.textContent).toBe(label);
      }
    });
  if (optionNotFound) {
    throw new Error(`Can't find phone number: ${phoneNumber}`);
  }
};
