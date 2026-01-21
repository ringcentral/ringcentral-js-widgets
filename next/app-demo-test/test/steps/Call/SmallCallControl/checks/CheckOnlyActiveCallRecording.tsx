import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckOnlyActiveCallRecording: StepFunction = async () => {
  expect(screen.queryByTestId('stopRecord')).toBeInTheDocument();

  await whenStateChange(() =>
    expect(screen.queryByTestId('recordingIndicator')).toBeInTheDocument(),
  );
  expect(screen.queryByTestId('subRecordingIndicator')).toBeNull();
  expect(screen.queryByTestId('recordingIndicatorHeader')).toBeInTheDocument();
};

export { CheckOnlyActiveCallRecording };
