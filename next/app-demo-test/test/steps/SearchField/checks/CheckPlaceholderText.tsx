import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckPlaceholderTextProps {
  isShow?: boolean;
}

export const CheckPlaceholderText: StepFunction<
  CheckPlaceholderTextProps
> = async ({ isShow = true }) => {
  const toRecipient = screen.queryByPlaceholderText('Enter name or number');
  if (isShow) {
    expect(toRecipient?.getAttribute('value')).toEqual('');
  } else {
    expect(toRecipient?.getAttribute('value')).not.toEqual('');
  }
};
