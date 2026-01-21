/**
 * RCI-6632: Input - Automatically adjust my mic level
 * https://test_it_domain/test-cases/RCI-6632
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio
 *
  | No. |Preconditions |Enabled |
  | 1 |No microphone permission was granted |False |
	| 2 |Microphone permission was granted |True |

 */
import { mockDevice } from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  p2,
  it,
  autorun,
  examples,
  screen,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import {
  CheckTextContent,
  CheckToggleOff,
  CheckToggleOn,
  ClickItemByDataSign,
} from '../../../../steps/Common';
import { CreateInstance } from '../../../../steps/CreateInstance';
import { Login as CommonLogin } from '../../../../steps/Login';
import { Logout } from '../../../../steps/Logout';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Input - Automatically adjust my mic level')
export class InputAdjustMicLevel extends Step {
  Entry: StepFunction<any, any> = CreateInstance;
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  @examples([
    {
      Preconditions: 'No microphone permission was granted',
      isEnabled: false,
      // no microphone permission was granted
      isMockUserMedia: false,
      mockDevices: [],
    },
    {
      Preconditions: 'Microphone permission was granted',
      isEnabled: true,
      // permission was granted
      isMockUserMedia: true,
    },
  ])
  run() {
    const { Entry, Login, CreateMock } = this;
    let getUserMediaSpy: any = null;
    return (
      <Scenario desc="Input - Automatically adjust my mic level">
        <When
          desc="User is on {Preconditions }"
          action={[
            CreateMock,
            <Entry
              isMockUserMedia={this.example.isMockUserMedia}
              mockDevices={this.example.mockDevices}
            />,
            () => {
              if (!this.example.isMockUserMedia) {
                navigator.mediaDevices.getUserMedia = jest
                  .fn()
                  .mockRejectedValue('permission reject');
              }
            },
            Login,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="Display switch toggle:
										Automatically adjust my mic level
										The toggle is {Enabled}
										Default value is off
										[L10N]"
          action={[
            <CheckTextContent content="Automatically adjust my mic level" />,
            <CheckToggleOff dataSign="autoAdjustMicLevel" />,
            () => {
              if (this.example.isEnabled) {
                expect(
                  screen.getByTestId('autoAdjustMicLevel'),
                ).toHaveAttribute('aria-disabled', 'false');
              } else {
                expect(
                  screen.getByTestId('autoAdjustMicLevel'),
                ).toHaveAttribute('aria-disabled', 'true');
              }
            },
          ]}
        />
        <When
          desc="Grant app audio permission"
          action={() => {
            if (!this.example.isMockUserMedia) {
              mockDevice([
                {
                  deviceId: 'default',
                  kind: 'audioinput',
                  label: 'Default - Internal Microphone (Built-in)',
                  groupId:
                    '2303aeba3eb3b5b69d8712798dc9f41b1f1a526f23d032cf53353248d9f6ba83',
                },
              ]);
              return <ClickItemByDataSign dataSign="checkPermissionAction" />;
            }
          }}
        />
        <Then
          desc="The switch toggle should be enabled and Off"
          action={[
            <CheckToggleOff dataSign="autoAdjustMicLevel" />,
            async () => {
              await whenStateChange(() => {
                expect(
                  screen.getByTestId('autoAdjustMicLevel'),
                ).toHaveAttribute('aria-disabled', 'false');
              });

              getUserMediaSpy = jest.spyOn(
                navigator.mediaDevices,
                'getUserMedia',
              );
            },
          ]}
        />
        <When
          desc="Turn on the switch toggle"
          action={<ClickItemByDataSign dataSign="autoAdjustMicLevel" />}
        />
        <Then
          desc="The switch toggle should be on
										browser audio settingautoGainControlshould be enabled"
          action={[
            <CheckToggleOn dataSign="autoAdjustMicLevel" />,
            () => {
              expect(getUserMediaSpy).toHaveBeenCalledWith({
                audio: {
                  autoGainControl: true,
                },
              });
            },
            <Logout shouldFlush shouldReset />,
          ]}
        />
      </Scenario>
    );
  }
}
