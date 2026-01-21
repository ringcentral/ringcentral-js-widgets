import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const TypeInvalidForwardNumber: StepFunction = async () => {
  const inputEle = screen.getByTestId('input');
  fireEvent.change(inputEle, {
    target: { value: '@#$' },
  });
};
