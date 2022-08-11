import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const MakeForwardCall: StepFunction<{
  phoneNumber: string;
}> = async ({ phoneNumber }, context) => {
  CallButtonBehavior({ callButtonBehaviorType: 'forward' }, context);
  expect(screen.getByTestId('forwardPage')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('customNumber'));
  expect(screen.getByTestId('recipientsInput')).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('recipientsInput'), {
    target: { value: phoneNumber },
  });
  await waitUntilTo(() => {
    expect(screen.getByTestId('recipientsInput')).toHaveValue(phoneNumber);
  });
  expect(screen.getByTestId('forwardCall')).not.toBeDisabled();
  fireEvent.click(screen.getByTestId('forwardCall'));
};
