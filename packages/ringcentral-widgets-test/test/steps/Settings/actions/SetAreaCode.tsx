import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { StepFunction } from '../../../lib/step';

interface SetAreaCodeInt {
  areaCode: string;
}

export const SetAreaCode: StepFunction<SetAreaCodeInt> = async ({
  areaCode,
}) => {
  act(() => {
    fireEvent.change(screen.getByTestId('areaCodeInputField'), {
      target: { value: areaCode },
    });
  });

  expect(screen.getByTestId('areaCodeInputField')).toHaveValue(areaCode);

  act(() => {
    fireEvent.click(screen.getByTestId('saveButton'));
  });

  await waitUntilTo(() => {
    expect(
      screen.getByText('Settings saved successfully.'),
    ).toBeInTheDocument();
  });
};
