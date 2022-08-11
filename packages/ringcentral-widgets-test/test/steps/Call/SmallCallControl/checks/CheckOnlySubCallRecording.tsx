import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

const CheckOnlySubCallRecording: StepFunction = async () => {
  await waitUntilTo(() =>
    expect(screen.queryByTestId('subRecordingIndicator')).toBeInTheDocument(),
  );
  expect(screen.queryByTestId('recordingIndicator')).toBeNull();
  expect(screen.queryByTestId('recordingIndicatorHeader')).toBeInTheDocument();
};

export { CheckOnlySubCallRecording };
