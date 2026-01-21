/**
 * RCI-6617: Ringtone source list
 * https://test_it_domain/test-cases/RCI-6617
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio >Output> Ringtones
 */
// need to import at the top
// eslint-disable-next-line prettier/prettier
import '../../../../steps/Mock/MockDefaultRingtoneSource';
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import {
  CheckRingtoneButtonTooltip,
  CheckRingtoneClosedAndSelected,
  CheckRingtoneDropDown,
  DoActionOnRingtoneItem,
} from '../../../../steps/AudioSettings';
import { MakeInboundCall } from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
// eslint-disable-next-line prettier/prettier
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Ringtone source list')
export class DefaultRingtone extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Ringtone source">
        <When
          desc="Direct to entry points"
          action={[CreateMock, Login, <NavigateTo path="/settings/audio" />]}
        />
        <Then
          desc="Display section label:'Ringtones', 'Add' button with a dropdown list:
										Default- Phone Ring 1
                    Phone Ring 2
										Acoustic Dreams
										Air Raid
										Allusive
										Attention
										Blub Blub
										Buzzy
										Channel Open
										Contemplation
										Crystal Ball
										Disco
										Door Bell
										Fairy
										Fast Bells
										High Gong
										Immersion
										Indeed
										Lazy Day
										Neural Funk
										Nice
										Ring
										Ringing Bells
										Simple
										Soothing
										Sunshine
										Off
										[L10N]"
          action={[
            <CheckRingtoneDropDown
              summary="Ringtones"
              dataSign="ringtoneSelection"
              options={[
                {
                  value: 'Add',
                  roleOption: 'menuitem',
                  canPlay: false,
                },
                {
                  value: 'Phone Ring 1',
                  isSelected: true,
                  canPlay: true,
                },
                {
                  value: 'Phone Ring 2',
                  canPlay: true,
                },
                {
                  value: 'Acoustic Dreams',
                  canPlay: true,
                },
                {
                  value: 'Air Raid',
                  canPlay: true,
                },
                {
                  value: 'Allusive',
                  canPlay: true,
                },
                {
                  value: 'Attention',
                  canPlay: true,
                },
                {
                  value: 'Blub Blub',
                  canPlay: true,
                },
                {
                  value: 'Buzzy',
                  canPlay: true,
                },
                {
                  value: 'Channel Open',
                  canPlay: true,
                },
                {
                  value: 'Contemplation',
                  canPlay: true,
                },
                {
                  value: 'Crystal Ball',
                  canPlay: true,
                },
                {
                  value: 'Disco',
                  canPlay: true,
                },
                {
                  value: 'Door Bell',
                  canPlay: true,
                },
                {
                  value: 'Fairy',
                  canPlay: true,
                },
                {
                  value: 'Fast Bells',
                  canPlay: true,
                },
                {
                  value: 'High Gong',
                  canPlay: true,
                },
                {
                  value: 'Immersion',
                  canPlay: true,
                },
                {
                  value: 'Indeed',
                  canPlay: true,
                },
                {
                  value: 'Lazy Day',
                  canPlay: true,
                },
                {
                  value: 'Neural Funk',
                  canPlay: true,
                },
                {
                  value: 'Nice',
                  canPlay: true,
                },
                {
                  value: 'Ring',
                  canPlay: true,
                },
                {
                  value: 'Ringing Bells',
                  canPlay: true,
                },
                {
                  value: 'Simple',
                  canPlay: true,
                },
                {
                  value: 'Soothing',
                  canPlay: true,
                },
                {
                  value: 'Sunshine',
                  canPlay: true,
                },
                {
                  value: 'Off',
                  canPlay: false,
                },
              ]}
            />,
          ]}
        />
        <When desc="Check the play button" />
        <Then
          desc="There should be a play button next to each ringtone
								Display 'Play' as tooltips[L10N]"
          action={<CheckRingtoneButtonTooltip button="Play" tooltip="Play" />}
        />
        <When
          desc="Click the play button of 'Phone Ring 1' item"
          action={<DoActionOnRingtoneItem type="Play" value="Phone Ring 1" />}
        />
        <Then
          desc="Play the ringtone 'Phone Ring 1'"
          action={() => {
            expect((global as any).mockAudio.src).toBe('phone_ring1.mp3');
            expect((global as any).mockAudio.play).toHaveBeenCalled();
          }}
        />
        <When
          desc="Select 'Crystal Ball'as the Ringtone source"
          action={<DoActionOnRingtoneItem type="Click" value="Crystal Ball" />}
        />
        <Then
          desc="The ringtone source will be 'Crystal Ball'
								The ringtone list is close"
          action={[
            <CheckRingtoneClosedAndSelected value="Crystal Ball" />,
            (_: any, { app }: any) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone.incomingAudio).toBe('crystal_ball.mp3');
            },
          ]}
        />
        <When
          desc="Click the ringtone dropdown list, select 'Off' as the Ringtone source
								And make an incoming call"
          action={[
            <DoActionOnRingtoneItem needPreOpen type="Click" value="Off" />,
            MakeInboundCall,
          ]}
        />
        <Then
          desc="There is no ringtone"
          action={(_: any, { app }: any) => {
            // ringtone setting only set ringtone url to webphone.userAgent.audioHelper
            // the rest of part is handled by webphone module
            const webphone = app.container.got(Webphone)!;
            expect(webphone.incomingAudio).toBe('');
            expect(webphone._webphone.userAgent.audioHelper._incoming).toBe('');
          }}
        />
      </Scenario>
    );
  }
}
