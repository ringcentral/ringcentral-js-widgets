import {
  autorun,
  Given,
  Scenario,
  Step,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { VolumeInspector } from '../../modules/VolumeInspector';
import { mockModuleGenerator } from '../lib/mockModule';

jest.mock('@ringcentral-integration/core', () => ({
  ...jest.requireActual('@ringcentral-integration/core'),
  action: jest.fn(),
  state: jest.fn(),
}));

jest.mock('@ringcentral-integration/commons/lib/proxy/proxify', () => ({
  ...jest.requireActual('@ringcentral-integration/commons/lib/proxy/proxify'),
  proxify: jest.fn(),
}));

const getMockModule = () =>
  mockModuleGenerator({
    _deps: { audioSettings: {} },
    audioDetector: {
      connect: jest.fn(),
      registerListener: jest.fn(),
    },
    completeTest: jest.fn(),
    setTestState: jest.fn(),
  });

@autorun(test)
@title('VolumeInspector Module test')
export class VolumeInspectorTest extends Step {
  run() {
    return (
      <Scenario desc="VolumeInspector Module test">
        <Given
          desc="Create an VolumeInspector instance with default value"
          action={(_: any, context: any) => {
            jest.spyOn(console, 'warn');
            const volumeInspector = new VolumeInspector({} as any);
            expect(volumeInspector).not.toBe(null);
            context.instance = volumeInspector;
            context.mockModule = getMockModule();
          }}
        />
        <When
          desc="Call VolumeInspector 'setupAudioDetector' will meet error when no audioEl"
          action={(_: any, context: any) => {
            context.mockModule.audioEl = null;
            const mockFn = jest.spyOn(
              context.mockModule.audioDetector,
              'connect',
            );
            context.instance.setupAudioDetector.call(context.mockModule);
            expect(mockFn).not.toHaveBeenCalled();
          }}
        />
        <When
          desc="Call VolumeInspector 'setupAudioDetector' will meet error when registerListener error"
          action={(_: any, context: any) => {
            context.mockModule.audioEl = new Audio();
            jest
              .spyOn(context.mockModule.audioDetector, 'registerListener')
              .mockReturnValue(new Error('error'));
            context.instance.setupAudioDetector.call(context.mockModule);
            expect(context.mockModule.detectorListenDisposer).toBe(undefined);
          }}
        />
        <When
          desc="Will console warn when startRecording error"
          action={(_: any, context: any) => {
            context.instance.startRecording.call(context.mockModule);
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
