import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../../lib/step';

export const TypeInvalidForwardNumber: StepFunction = async () => {
  const inputEle = screen.getByTestId('input');
  fireEvent.change(inputEle, {
    target: { value: '@#$' },
  });
};
