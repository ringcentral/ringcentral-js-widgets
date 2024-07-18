import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface ICheckCurrentName {
  nameItem: string;
  defaultQueryType?: 'title' | 'text';
}
export const CheckCurrentName: StepFunction<ICheckCurrentName> = async ({
  nameItem,
  defaultQueryType = 'title',
}) => {
  let currentNameItem;
  switch (nameItem) {
    case 'Select record': {
      currentNameItem = await screen.findByText(nameItem);
      break;
    }
    case 'noMatch': {
      currentNameItem = await screen.getByTestId(nameItem);
      break;
    }
    default: {
      currentNameItem =
        defaultQueryType === 'title'
          ? await screen.findByTitle(nameItem)
          : await screen.findByText(nameItem);
    }
  }
  expect(currentNameItem).toBeInTheDocument();
};
interface ICheckSearchResult {
  nameItems: string[];
  defaultQueryType?: 'title' | 'text';
}
export const CheckSearchResult: StepFunction<ICheckSearchResult> = async (
  { nameItems, defaultQueryType },
  context,
) => {
  for (const nameItem of nameItems) {
    await CheckCurrentName(
      {
        nameItem,
        defaultQueryType,
      },
      context,
    );
  }
};
