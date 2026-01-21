import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckSelectContactMenu: StepFunction<{
  itemsNames: string[];
}> = async ({ itemsNames }) => {
  for (const itemName of itemsNames) {
    screen.getByText(itemName);
  }
};

export { CheckSelectContactMenu };
