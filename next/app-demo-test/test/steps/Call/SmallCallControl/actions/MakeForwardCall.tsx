import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { CallButtonBehavior } from './CallButtonBehavior';

export const MakeForwardCall: StepFunction<{
  phoneNumber: string;
}> = async ({ phoneNumber }) => {
  return (
    <>
      <CallButtonBehavior callButtonBehaviorType={'forward'} />
      {async () => {
        expect(screen.getByTestId('forwardPage')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('customNumber'));
        expect(screen.getByTestId('recipientsInput')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('recipientsInput'), {
          target: { value: phoneNumber },
        });
        await whenStateChange(() => {
          expect(screen.getByTestId('recipientsInput')).toHaveValue(
            phoneNumber,
          );
        });
        expect(screen.getByTestId('forwardCall')).not.toBeDisabled();
        fireEvent.click(screen.getByTestId('forwardCall'));
      }}
    </>
  );
};
