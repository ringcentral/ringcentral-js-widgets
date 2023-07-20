import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckRecipientsInput: StepFunction = async () => {
  const recipientsInput = screen.getByTestId('recipientsInput') as HTMLElement;

  expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
  expect(recipientsInput.value).toEqual(new Array(31).join('0'));
  expect(recipientsInput.value.length).toBe(30);
};

export const CheckRecipientsItems: StepFunction<{ nameList: string[] }> =
  async ({ nameList }) => {
    const recipientsItems = screen.queryAllByTestId('recipientsChip');
    const res = recipientsItems.map((item) => item?.textContent);

    expect(res).toEqual(nameList);
  };
