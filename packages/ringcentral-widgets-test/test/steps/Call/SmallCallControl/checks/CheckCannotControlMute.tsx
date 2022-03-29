import { fireEvent, screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

const CheckCannotControlMute: StepFunction<{
  needCheckRecordingIndicator: boolean;
}> = async ({ needCheckRecordingIndicator = false }) => {
  if (needCheckRecordingIndicator) {
    expect(screen.queryByTestId('recordingIndicator')).toBeInTheDocument();
    expect(
      screen.queryByTestId('recordingIndicatorHeader'),
    ).toBeInTheDocument();
  }
};

export { CheckCannotControlMute };
