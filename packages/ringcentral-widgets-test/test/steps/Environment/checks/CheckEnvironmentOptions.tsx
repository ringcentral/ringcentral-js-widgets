import { screen } from '@testing-library/react';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const CheckEnvironmentOptions: StepFunction<{
  server?: string;
  enableDataTracking?: boolean;
}> = ({ server, enableDataTracking }, context: Context) => {
  const serverElem = screen.queryByTestId('envServerUrl');
  expect(serverElem).toBeInTheDocument();
  expect(serverElem).toHaveValue(server);

  if (enableDataTracking !== undefined) {
    const dataTrackingElem = screen.queryByTestId('dataTrackingToggle')!;
    expect(dataTrackingElem).toBeInTheDocument();
    if (enableDataTracking) {
      expect(dataTrackingElem.querySelector('input')).toBeChecked();
    } else {
      expect(dataTrackingElem.querySelector('input')).not.toBeChecked();
    }
  }
};
