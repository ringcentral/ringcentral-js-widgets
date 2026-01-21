import {
  autorun,
  Given,
  Scenario,
  Step,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { VolumeInspector } from '../../src/app/services/VolumeInspector';

jest.mock(
  '@ringcentral-integration/next-core/src/lib/decorators/delegateMainClient',
  () => ({
    ...jest.requireActual(
      '@ringcentral-integration/next-core/src/lib/decorators/delegateMainClient',
    ),
    delegateMainClient: jest.fn(),
  }),
);

jest.mock(
  '@ringcentral-integration/next-core/src/lib/decorators/action',
  () => ({
    ...jest.requireActual(
      '@ringcentral-integration/next-core/src/lib/decorators/action',
    ),
    action: jest.fn(),
  }),
);

@autorun(test)
@title('VolumeInspector Module test')
class VolumeInspectorTest extends Step {
  run() {
    return (
      <Scenario desc="VolumeInspector Module test">
        <Given
          desc="Create an VolumeInspector instance with default value"
          action={(_: any, context: any) => {
            jest.spyOn(console, 'warn');
            const volumeInspector = new VolumeInspector({} as any, {} as any);
            volumeInspector._portManager = {};
            expect(volumeInspector).not.toBe(null);
            context.instance = volumeInspector;
          }}
        />
        <When
          desc="Call VolumeInspector 'setupAudioDetector' will meet error when no audioEl"
          action={(_: any, context: any) => {
            context.instance.audioEl = null;
            const mockFn = jest.spyOn(
              context.instance.audioDetector,
              'connect',
            );
            context.instance.setupAudioDetector();
            expect(mockFn).not.toHaveBeenCalled();
          }}
        />
        <When
          desc="Call VolumeInspector 'setupAudioDetector' will meet error when registerListener error"
          action={(_: any, context: any) => {
            context.instance.audioEl = new Audio();
            jest
              .spyOn(context.instance.audioDetector, 'registerListener')
              .mockReturnValue(new Error('error'));
            context.instance.setupAudioDetector();
            expect(context.instance.detectorListenDisposer).toBe(null);
          }}
        />
        <When
          desc="Will console warn when startRecording error"
          action={async (_: any, context: any) => {
            jest
              .spyOn(context.instance.micLevel, 'setupMicMedia')
              .mockRejectedValue(new Error('error'));
            await context.instance.startRecording();
            expect(console.warn).toHaveBeenCalledWith(
              'can not setup mic media',
              expect.any(Error),
            );
          }}
        />
        <When
          desc="Will execute completeTest when mediaRecorderHelper.stopRecording meet error"
          action={(_: any, context: any) => {
            const mockFn = jest.spyOn(context.instance, 'completeTest');
            jest
              .spyOn(context.instance.mediaRecorderHelper, 'stopRecording')
              .mockImplementation(() => {
                throw new Error('error');
              });
            context.instance.stopRecording();
            expect(mockFn).toHaveBeenCalled();
            expect(console.warn).toHaveBeenCalledWith(
              'stopRecording failed',
              expect.any(Error),
            );
          }}
        />
      </Scenario>
    );
  }
}
