import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

const CheckSelectContactMenu: StepFunction<{
  itemsNames: string[];
}> = async ({ itemsNames }) => {
  for (const itemName of itemsNames) {
    screen.getByText(itemName);
  }
};

export { CheckSelectContactMenu };
