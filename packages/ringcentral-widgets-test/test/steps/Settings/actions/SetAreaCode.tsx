import { act, fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

interface SetAreaCodeInt {
  areaCode: string;
}
export const SetAreaCode: StepFunction<SetAreaCodeInt> = ({ areaCode }) => {
  act(() => {
    fireEvent.change(screen.getByTestId('areaCodeInputField'), {
      target: { value: areaCode },
    });
    fireEvent.click(screen.getByTestId('saveButton'));
  });
};
