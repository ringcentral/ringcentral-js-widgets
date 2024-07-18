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
