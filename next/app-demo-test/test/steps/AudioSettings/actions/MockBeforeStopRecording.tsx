import { VolumeInspector } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockBeforeStopRecording: StepFunction<{
  shouldTriggerStop?: boolean;
}> = ({ shouldTriggerStop = false }, { app }) => {
  const volumeInspector = app.container.got(VolumeInspector)!;
  const {
    // @ts-ignore
    micLevel,
    // @ts-ignore
    mediaRecorderHelper: { mediaRecorder },
  } = volumeInspector;
  // @ts-ignore
  micLevel.micLevel._audioStream = {
    getTracks: jest.fn().mockReturnValue({
      forEach: jest.fn(),
    }),
  };
  // mock the native MediaRecorder will trigger onstop when invoke stop
  mediaRecorder.stop = mediaRecorder.onstop;
  if (shouldTriggerStop) {
    mediaRecorder!.stop();
  }
};
