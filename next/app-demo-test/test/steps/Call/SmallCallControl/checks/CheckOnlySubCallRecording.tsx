import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckOnlySubCallRecording: StepFunction = async () => {
  await whenStateChange(() =>
    expect(screen.queryByTestId('subRecordingIndicator')).toBeInTheDocument(),
  );
  expect(screen.queryByTestId('recordingIndicator')).toBeNull();
  expect(screen.queryByTestId('recordingIndicatorHeader')).toBeInTheDocument();
};

export { CheckOnlySubCallRecording };
