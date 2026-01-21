import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckDialPadInput: StepFunction<{ content: string }> = ({
  content,
}) => {
  const inputEle = screen.getByTestId('input');
  expect(inputEle.getAttribute('value')).toBe(content);
};
