/**
 * RCI-6634: Hide/Show Automatically adjust my mic level
 * https://test_it_domain/test-cases/RCI-6634
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio
 *
  | No. |Preconditions |Status |
  | 1 |The browser supportsautoGainControl |Show |
	| 2 |The browser doesn't supportautoGainControlNote:Safari |Hide |

 */
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

import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Hide/Show Automatically adjust my mic level')
export class ShowAdjustMicLevel extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  @examples([
    {
      Preconditions:
        "The browser doesn't support autoGainControl(value is false)",
      mockGetSupportedConstraints: () => {
        navigator.mediaDevices.getSupportedConstraints = jest
          .fn()
          .mockReturnValue({
            autoGainControl: false,
          });
      },
      isExist: false,
    },
    {
      Preconditions: "The browser doesn't support autoGainControl(api error)",
      mockGetSupportedConstraints: () => {
        navigator.mediaDevices.getSupportedConstraints = jest
          .fn()
          .mockReturnValue(null);
      },
      isExist: false,
    },
    {
      Preconditions: 'The browser supports autoGainControl',
      mockGetSupportedConstraints: () => {
        navigator.mediaDevices.getSupportedConstraints = jest
          .fn()
          .mockReturnValue({
            autoGainControl: true,
          });
      },
      isExist: true,
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Hide/Show Automatically adjust my mic level">
        <When
          desc="User is on {Preconditions }, goto Entry point"
          action={[
            () => {
              this.example.mockGetSupportedConstraints();
            },
            CreateMock,
            Login,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="Toggle Automatically adjust my mic level should be {status}"
          action={() => {
            if (this.example.isExist) {
              expect(
                screen.getByTestId('autoAdjustMicLevel'),
              ).toBeInTheDocument();
            } else {
              expect(
                screen.queryByTestId('autoAdjustMicLevel'),
              ).not.toBeInTheDocument();
            }
          }}
        />
      </Scenario>
    );
  }
}
