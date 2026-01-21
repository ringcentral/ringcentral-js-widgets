import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { getByTestId, screen, waitFor } from '@testing-library/react';

export const CheckAddCallPageDisplay: StepFunction = async () => {
  await whenStateChange(() => {
    const container = screen.getByTestId('addCallPage');
    expect(getByTestId(container, 'backButton')).toBeInTheDocument();
    expect(screen.getByText('New call')).toBeInTheDocument();
    expect(getByTestId(container, 'recipientsInput')).toBeInTheDocument();
    expect(getByTestId(container, 'dialPad')).toBeInTheDocument();
    expect(getByTestId(container, 'callButton')).toBeInTheDocument();
  });
};
