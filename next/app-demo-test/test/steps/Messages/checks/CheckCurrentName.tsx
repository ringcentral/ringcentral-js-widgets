import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface ICheckCurrentName {
  nameItem: string;
  defaultQueryType?: 'title' | 'text';
}
export const CheckCurrentName: StepFunction<ICheckCurrentName> = async ({
  nameItem,
  defaultQueryType = 'title',
}) => {
  let currentNameItem;
  await whenStateChange(() => {
    switch (nameItem) {
      case 'Select record': {
        currentNameItem = screen.getByText(nameItem);
        break;
      }
      case 'noMatch': {
        currentNameItem = screen.getByTestId(nameItem);
        break;
      }
      default: {
        currentNameItem =
          defaultQueryType === 'title'
            ? screen.getByTitle(nameItem)
            : screen.getByText(nameItem);
      }
    }
    expect(currentNameItem).toBeInTheDocument();
  });
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
