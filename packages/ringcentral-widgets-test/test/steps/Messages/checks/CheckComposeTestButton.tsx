import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckComposeTestButton: StepFunction = async () => {
  const ComposeText = screen.queryByTestId('ComposeText') as HTMLElement;
  expect(ComposeText.title).toBe('Compose Text');
};
