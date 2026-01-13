import {
  autorun,
  Scenario,
  Step,
  Then,
  title,
  waitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import { WebphoneAudioHelper as AudioHelper } from '../../modules/Webphone/AudioHelper';

@autorun(test)
@title('AudioHelper::playSound')
export class PlaySound extends Step {
  run() {
    return (
      <Scenario desc="should play sound successfully">
        <When
          desc="AudioHelp setup"
          action={(_: any, context: any) => {
            context.audioHelper = new AudioHelper({
              enabled: true,
              incoming: 'http://incoming_uri',
              outgoing: 'http://outgoing_uri',
            });
          }}
        />
        <Then
          desc="should play sound successfully at first time"
          action={(_: any, { audioHelper }: any) => {
            audioHelper.playIncoming(true);
            const audio = audioHelper._audio['http://incoming_uri'];
            expect(audio.src).toContain('http://incoming_uri');
          }}
        />
        <Then
          desc="should play sound successfully at second time"
          action={(_: any, { audioHelper }: any) => {
            audioHelper.playIncoming(true);
            const audio = audioHelper._audio['http://incoming_uri'];
            expect(audio.src).toContain('http://incoming_uri');
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('AudioHelper::stopSound')
export class StopSound extends Step {
  run() {
    return (
      <Scenario desc="should stop sound successfully">
        <When
          desc="AudioHelp setup"
          action={(_: any, context: any) => {
            context.audioHelper = new AudioHelper({
              enabled: true,
              incoming: 'http://incoming_uri',
              outgoing: 'http://outgoing_uri',
            });
          }}
        />
        <Then
          desc="should stop sound successfully when no playing"
          action={(_: any, { audioHelper }: any) => {
            audioHelper.playIncoming(false);
            const audio = audioHelper._audio['http://incoming_uri'];
            expect(audio).toBeUndefined();
          }}
        />
        <Then
          desc="should stop sound successfully when there are playing"
          action={async (_: any, { audioHelper }: any) => {
            audioHelper.playIncoming(true);
            audioHelper.playIncoming(false);
            const audio = audioHelper._audio['http://incoming_uri'];
            await waitForRenderReady();
            expect(audio.src).not.toContain('http://incoming_uri');
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('AudioHelper::NoEnabled')
export class NoPlaySoundAtNoEnabled extends Step {
  run() {
    return (
      <Scenario desc="should not play sound at no enabled">
        <When
          desc="AudioHelp setup"
          action={(_: any, context: any) => {
            context.audioHelper = new AudioHelper({
              enabled: false,
              incoming: 'http://incoming_uri',
              outgoing: 'http://outgoing_uri',
            });
          }}
        />
        <Then
          desc="should not play sound successfully at first time"
          action={(_: any, { audioHelper }: any) => {
            audioHelper.playIncoming(true);
            expect(Object.keys(audioHelper._audio).length).toBe(0);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('AudioHelper::NoUrl')
export class NoPlaySoundAtNoUrl extends Step {
  run() {
    return (
      <Scenario desc="should not play sound at no url">
        <When
          desc="AudioHelp setup"
          action={(_: any, context: any) => {
            context.audioHelper = new AudioHelper({
              enabled: true,
              outgoing: 'http://outgoing_uri',
            });
          }}
        />
        <Then
          desc="should not play sound successfully at first time"
          action={(_: any, { audioHelper }: any) => {
            audioHelper.playIncoming(true);
            expect(Object.keys(audioHelper._audio).length).toBe(0);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('AudioHelper::NoDeviceId')
export class NoPlaySoundAtNoDeviceId extends Step {
  run() {
    const mockAudio: any = {
      src: '',
      loop: false,
      volume: 0,
      setSinkId: jest.fn().mockResolvedValue(null),
      play: jest.fn().mockResolvedValue(null),
      playPromise: Promise.resolve(),
    };
    global.Audio = jest.fn(() => mockAudio);
    return (
      <Scenario desc="should not play sound at no device id">
        <When
          desc="AudioHelp setup with no device id"
          action={(_: any, context: any) => {
            context.audioHelper = new AudioHelper({
              enabled: true,
              outgoing: 'http://outgoing_uri',
            });
            context.audioHelper.setDeviceId('off');
          }}
        />
        <Then
          desc="should not play audio if deviceId is empty"
          action={(_: any, { audioHelper }: any) => {
            audioHelper._playSound('test-url', true, 1);
            expect(global.Audio).not.toHaveBeenCalled();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('AudioHelper::setSinkId error')
export class HandelSetSinkIdError extends Step {
  run() {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockAudio: any = {
      src: '',
      loop: false,
      volume: 0,
      setSinkId: jest.fn().mockResolvedValue(null),
      play: jest.fn().mockResolvedValue(null),
      playPromise: Promise.resolve(),
    };
    global.Audio = jest.fn(() => mockAudio);
    return (
      <Scenario desc="should not play sound at no device id">
        <When
          desc="AudioHelp setup with no device id"
          action={(_: any, context: any) => {
            context.audioHelper = new AudioHelper({
              enabled: true,
              outgoing: 'http://outgoing_uri',
            });
          }}
        />
        <Then
          desc="should not play audio if deviceId is empty"
          action={async (_: any, { audioHelper }: any) => {
            mockAudio.setSinkId.mockRejectedValue('setSinkId error');
            await audioHelper._playSound('test-url', true, 1);
            expect(consoleErrorSpy).toHaveBeenCalledWith(
              'setSinkId error:',
              'setSinkId error',
            );
            consoleErrorSpy.mockRestore();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('AudioHelper::playAudio error')
export class HandelPlayAudioError extends Step {
  run() {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockAudio: any = {
      src: '',
      loop: false,
      volume: 0,
      setSinkId: jest.fn().mockResolvedValue(null),
      play: jest.fn().mockResolvedValue(null),
      playPromise: Promise.resolve(),
    };
    global.Audio = jest.fn(() => mockAudio);
    return (
      <Scenario desc="should not play sound at no device id">
        <When
          desc="AudioHelp setup with no device id"
          action={(_: any, context: any) => {
            context.audioHelper = new AudioHelper({
              enabled: true,
              outgoing: 'http://outgoing_uri',
            });
          }}
        />
        <Then
          desc="should not play audio if deviceId is empty"
          action={async (_: any, { audioHelper }: any) => {
            mockAudio.play.mockRejectedValue('playAudio error');
            await audioHelper._playSound('test-url', true, 1);
            expect(consoleErrorSpy).toHaveBeenCalledWith(
              'playAudio error:',
              'playAudio error',
            );
            consoleErrorSpy.mockRestore();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('AudioHelper::setDeviceId')
export class CheckSetDeviceId extends Step {
  run() {
    return (
      <Scenario desc="check audio helper's setDeviceId">
        <When
          desc="AudioHelp setup"
          action={(_: any, context: any) => {
            context.webphoneAudioHelper = new AudioHelper();
          }}
        />
        <Then
          desc="should set the device ID correctly"
          action={(_: any, { webphoneAudioHelper }: any) => {
            const deviceId = 'test-device-id';
            webphoneAudioHelper.setDeviceId(deviceId);
            expect(webphoneAudioHelper._deviceId).toBe(deviceId);
          }}
        />
        <Then
          desc="should handle empty device ID"
          action={(_: any, { webphoneAudioHelper }: any) => {
            const deviceId = '';
            webphoneAudioHelper.setDeviceId(deviceId);
            expect(webphoneAudioHelper._deviceId).toBe(deviceId);
          }}
        />
        <Then
          desc="should handle null device ID"
          action={(_: any, { webphoneAudioHelper }: any) => {
            const deviceId = null;
            webphoneAudioHelper.setDeviceId(deviceId);
            expect(webphoneAudioHelper._deviceId).toBe(deviceId);
          }}
        />
        <Then
          desc="should handle undefined device ID"
          action={(_: any, { webphoneAudioHelper }: any) => {
            const deviceId = undefined;
            webphoneAudioHelper.setDeviceId(deviceId);
            expect(webphoneAudioHelper._deviceId).toBe('default');
          }}
        />
      </Scenario>
    );
  }
}
