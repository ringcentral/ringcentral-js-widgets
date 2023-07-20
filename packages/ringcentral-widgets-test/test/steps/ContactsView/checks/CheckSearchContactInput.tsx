import { screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

export const CheckSearchContactInput: StepFunction<{
  content: string;
}> = async ({ content }) => {
  expect(screen.getByTestId('contactsSearchInput')).toHaveValue(content);
};
