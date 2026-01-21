import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckSearchContactInput: StepFunction<{
  content: string;
}> = async ({ content }) => {
  expect(screen.getByTestId('contactsSearchInput')).toHaveValue(content);
};
