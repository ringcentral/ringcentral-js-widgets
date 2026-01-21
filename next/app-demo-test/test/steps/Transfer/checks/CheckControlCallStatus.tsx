import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { getByTestId, screen } from '@testing-library/react';

interface CheckControlCallStatusProps {
  action: string;
}
export const CheckControlCallStatus: StepFunction<
  CheckControlCallStatusProps
> = async ({ action }) => {
  const logSection = screen.getByTestId('logSection');
  if (action === 'record') {
    expect(screen.queryByTestId('record')).toBeNull();
    await whenStateChange(() =>
      expect(getByTestId(logSection, 'recordingIndicator')).toBeInTheDocument(),
    );
  } else if (action === 'hold') {
    expect(screen.queryByTestId('hold')).toBeNull();
    expect(logSection?.className).toContain('onHold');
  } else {
    expect(screen.queryByTestId('mute')).toBeNull();
  }
};
