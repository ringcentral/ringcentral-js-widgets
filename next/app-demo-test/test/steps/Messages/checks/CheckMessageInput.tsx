import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckMessageInput: StepFunction = async () => {
  expect(screen.getByTestId('messageInput').textContent).toEqual(
    new Array(1001).join('0'),
  );

  expect(screen.getByTestId('messageInput').textContent?.length).toEqual(1000);
};
