/**
 * RCI-6626: Render custom ringtone file
 * https://test_it_domain/test-cases/RCI-6626
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has uploaded 2 custom ringtones: Test1.mp3 and Test2.wav
 * Entry point(/s):
 * Go to Settings > Audio >Output> Ringtones, click the dropdown list,
 */
// need to import at the top
// eslint-disable-next-line prettier/prettier
import '../../../../steps/Mock/MockDefaultRingtoneSource';
import { RingtoneConfiguration } from '@ringcentral-integration/micro-phone/src/app/services';
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

import { CheckRingtoneItem } from '../../../../steps/AudioSettings';
import { CommonLogin } from '../../../../steps/CommonLogin';
// eslint-disable-next-line prettier/prettier
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Render custom ringtone file')
export class CustomRingtone extends Step {
  CreateMock: StepFunction<any, any> | null = CreateMock;
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Render custom ringtone file">
        <When
          desc="Direct to entry points"
          action={[
            CreateMock,
            Login,
            ((_, { app }) => {
              const ringtoneConfiguration = app.container.got(
                RingtoneConfiguration,
              )!;
              ringtoneConfiguration.uploadCustomRingtone({
                id: 'custom-0b7124c6-778a-4ab5-b5d3-b1c2429e7f3d',
                url: 'Test1.wav',
                type: 'custom',
                name: 'Test1.wav',
              });
              ringtoneConfiguration.uploadCustomRingtone({
                id: 'custom-0b7124c6-778a-4ab5-b5d3-b1c2429e7f3d',
                url: 'Test2.wav',
                type: 'custom',
                name: 'Test2.wav',
              });
            }) as StepFunction,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="Display section label:'Ringtones', 'Add' button with a dropdown list:
										Test1
										Test2*note: The custom file display on the top
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
										Off"
          action={[
            <CheckRingtoneItem
              options={[
                {
                  index: 0,
                  value: 'Test1',
                  canDelete: true,
                  canPlay: true,
                },
                {
                  index: 1,
                  value: 'Test2',
                  canDelete: true,
                  canPlay: true,
                },
              ]}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
