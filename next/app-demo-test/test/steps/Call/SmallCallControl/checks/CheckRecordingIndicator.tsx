import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const CheckRecordingIndicator: StepFunction<{
  recordingIndicatorExist: boolean;
}> = async ({ recordingIndicatorExist = false }) => {
  const recordingIndicator = screen.queryByTestId('recordingIndicator');
  const recordingIndicatorHeader = screen.queryByTestId(
    'recordingIndicatorHeader',
  );
  if (recordingIndicatorExist) {
    expect(recordingIndicator).toBeInTheDocument();
    expect(recordingIndicatorHeader).toBeInTheDocument();
  } else {
    expect(recordingIndicator).toBeNull();
    expect(recordingIndicatorHeader).toBeNull();
  }
};

export { CheckRecordingIndicator };
