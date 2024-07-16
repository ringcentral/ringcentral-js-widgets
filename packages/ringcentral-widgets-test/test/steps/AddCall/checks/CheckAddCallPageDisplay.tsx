import { screen, waitFor, getByTestId } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckAddCallPageDisplay: StepFunction = async () => {
  await waitFor(() => {
    const container = screen.getByTestId('addCallPage');
    expect(getByTestId(container, 'backButton')).toBeInTheDocument();
    expect(screen.getByText('New call')).toBeInTheDocument();
    expect(getByTestId(container, 'recipientsInput')).toBeInTheDocument();
    expect(getByTestId(container, 'dialPad')).toBeInTheDocument();
    expect(getByTestId(container, 'callButton')).toBeInTheDocument();
  });
};
