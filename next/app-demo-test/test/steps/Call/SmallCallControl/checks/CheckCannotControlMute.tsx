import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

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
