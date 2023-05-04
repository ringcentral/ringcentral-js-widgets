import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

const CheckOnlyActiveCallRecording: StepFunction = async () => {
  expect(screen.queryByTestId('stopRecord')).toBeInTheDocument();

  await waitUntilTo(() =>
    expect(screen.queryByTestId('recordingIndicator')).toBeInTheDocument(),
  );
  expect(screen.queryByTestId('subRecordingIndicator')).toBeNull();
  expect(screen.queryByTestId('recordingIndicatorHeader')).toBeInTheDocument();
};

export { CheckOnlyActiveCallRecording };
