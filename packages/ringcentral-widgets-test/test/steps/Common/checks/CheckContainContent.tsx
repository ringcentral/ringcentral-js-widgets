import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

export const CheckContainContent: StepFunction<{
  containerDataSign: string;
  content: string;
}> = async ({ containerDataSign, content }) => {
  expect(screen.getByTestId(containerDataSign).textContent).toContain(content);
};
