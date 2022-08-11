import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckDialPadInput: StepFunction<{ content: string }> = ({
  content,
}) => {
  const inputEle = screen.getByTestId('input');
  expect(inputEle.getAttribute('value')).toBe(content);
};
