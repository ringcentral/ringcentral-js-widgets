import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckEula: StepFunction<{
  eulaLabel?: string;
  eulaLink?: string;
}> = async ({ eulaLabel, eulaLink }) => {
  const element = screen.getByTestId('eula');
  expect(element).toBeTruthy();
  expect(element).toHaveAttribute('href', eulaLink);
  expect(element.getAttribute('href')?.length).not.toBe(0);
  expect(element.innerHTML.length).not.toBe(0);
  expect(element.innerHTML).toEqual(eulaLabel);
};
