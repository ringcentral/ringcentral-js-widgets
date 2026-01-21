/**
 * RCI-7748: Disable accept call queue toggle when no permission
 * https://test_it_domain/test-cases/RCI-7748
 * Preconditions:
 *
 * Entry point(/s):
 * Go toSW > Users> Roles>User Settings,Set the 'Accept Queue Calls Control' permission as {acceptQueueControlOnSW}
 *
  | acceptQueueControlOnSW |toggleStatus |tooptip |
  | F |disabled |This setting is managed by your company administrator. |
	| T |enabled |N/A |

 */
import {
  And,
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  examples,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import { CheckTooltip } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CreateMock,
  MockFeaturePermission,
  MockMessageSync,
  MockPresence,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import { CheckAcceptCallQueueCalls } from '../../../../../steps/Settings';

@autorun(test)
@it
@common
@p2
@title('Disable accept call queue toggle when no permission')
export class RCI7748 extends Step {
  Login = CommonLogin;
  CreateMock: StepFunction<any, any> = CreateMock;

  @examples([
    {
      acceptQueueControlOnSW: false,
      toggleStatus: 'disabled',
      hasTooltip: true,
      tooltip: 'This setting is managed by your company administrator.',
    },
    {
      acceptQueueControlOnSW: true,
      toggleStatus: 'enabled',
      hasTooltip: false,
      tooltip: 'N/A',
    },
  ])
  run() {
    return (
      <Scenario desc="Disable accept call queue toggle when no permission">
        <Given
          desc="Create phone instance and login"
          action={[
            this.CreateMock,
            MockMessageSync,
            <MockPresence repeat={0} />,
            <MockFeaturePermission
              featureId="AcceptQueueCalls"
              available={this.example.acceptQueueControlOnSW}
              isDefaultInit
            />,
            this.Login,
          ]}
        />
        <When
          desc="Go to Settings, check 'Accept call queue' toggle"
          action={<NavigateTo path="/settings" />}
        />
        <Then
          desc="The status of'Accept call queue toggles' is toggleSatus"
          action={
            <CheckAcceptCallQueueCalls
              isAccept={true}
              isDisabled={this.example.toggleStatus === 'disabled'}
            />
          }
        />
        <When
          desc="Hover on the toggle, The tooltip is {tooltip}"
          action={() => {
            if (this.example.hasTooltip) {
              return (
                <CheckTooltip
                  dataSign="acceptQueueSwitch_tooltip"
                  tooltip={this.example.tooltip}
                />
              );
            } else {
              expect(
                screen.queryByTestId('acceptQueueSwitch_tooltip'),
              ).not.toBeInTheDocument();
            }
          }}
        />
      </Scenario>
    );
  }
}
