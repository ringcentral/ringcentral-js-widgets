import { Softphone } from '@ringcentral-integration/micro-phone/src/app/services';
import { StepFunction } from '@ringcentral-integration/test-utils';

/**
 *
 * @param platform String value of the platform to mock.
 * @description Mocks the platform returned by the detectPlatform method of the Softphone service.
 * The main reason to mock this is that on CI, the jsdom is detetected as a desktop platform, which
 * causes softphone to use hidden iframes to trigger uri-schemes. But often we want to spy on the
 * window.open method for verification, so we can use this to force the platform to be anything but
 * desktop to force the softphone module to use window.open instead of hidden iframes.
 */
export const MockDetectPlatformOnSoftphone: StepFunction<{
  platform: string;
}> = ({ platform }, ctx) => {
  jest
    .spyOn(ctx.app.container.got(Softphone)!, 'detectPlatform')
    .mockResolvedValue(platform);
};
