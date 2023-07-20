import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckMessageInput: StepFunction = async () => {
  expect(screen.getByTestId('messageInput').textContent).toEqual(
    new Array(1001).join('0'),
  );

  expect(screen.getByTestId('messageInput').textContent?.length).toEqual(1000);
};
