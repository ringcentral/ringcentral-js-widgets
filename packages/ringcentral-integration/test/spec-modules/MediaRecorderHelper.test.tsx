import {
  autorun,
  Given,
  Scenario,
  Step,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { MediaRecorderHelper } from '../../modules/VolumeInspector/MediaRecorderHelper';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    mediaRecorder: {
      state: 'active',
      stop: jest.fn(),
    },
    cleanupRecording: jest.fn(),
    setRecordingTime: jest.fn(),
  });

@autorun(test)
@title('MediaRecorderHelper Module test')
export class MediaRecorderHelperTest extends Step {
  run() {
    return (
      <Scenario desc="MediaRecorderHelper Module test">
        <Given
          desc="Create an MediaRecorderHelper instance with default value"
          action={(_: any, context: any) => {
            jest.spyOn(console, 'warn');
            const mediaRecorderHelper = new MediaRecorderHelper();
            expect(mediaRecorderHelper).not.toBe(null);
            context.instance = mediaRecorderHelper;
            context.mockModule = getMockModule();
          }}
        />
        <When
          desc="Call MediaRecorderHelper 'stopRecording' will meet error when mediaRecorder.stop meet error"
          action={(_: any, context: any) => {
            jest
              .spyOn(context.mockModule.mediaRecorder, 'stop')
              .mockImplementation(() => {
                throw new Error('stop error');
              });
            jest.spyOn(context.mockModule, 'cleanupRecording');
            expect(() =>
              context.instance.stopRecording.call(context.mockModule),
            ).toThrow();
          }}
        />
        <When
          desc="Call MediaRecorderHelper 'cleanupRecording' will revokeObjectURL when this.recordedMedia is not null"
          action={(_: any, context: any) => {
            jest.spyOn(URL, 'revokeObjectURL');
            context.mockModule.recordedMedia = 'test';
            context.instance.cleanupRecording.call(context.mockModule);
            expect(URL.revokeObjectURL).toHaveBeenCalledWith('test');
          }}
        />
      </Scenario>
    );
  }
}
