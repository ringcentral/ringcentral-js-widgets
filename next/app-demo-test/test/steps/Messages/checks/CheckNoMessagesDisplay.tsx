import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckNoMessagesDisplay: StepFunction = async (props, { app }) => {
  await whenStateChange(() => {
    const hint = screen.getByTestId('noMatch');
    expect(hint).toHaveTextContent('No Messages');
  });
};
