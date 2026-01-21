import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckBothCallRecording: StepFunction = async () => {
  expect(screen.queryByTestId('stopRecord')).toBeInTheDocument();

  await whenStateChange(() =>
    expect(screen.queryByTestId('recordingIndicator')).toBeInTheDocument(),
  );
  expect(screen.queryByTestId('subRecordingIndicator')).toBeInTheDocument();
  expect(screen.queryByTestId('recordingIndicatorHeader')).toBeInTheDocument();
};

export { CheckBothCallRecording };
