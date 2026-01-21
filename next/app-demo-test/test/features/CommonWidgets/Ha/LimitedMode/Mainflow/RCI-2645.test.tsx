/**
 * RCI-2645: Verify the App support RingOut call in the limited mode
 * https://test_it_domain/test-cases/RCI-2645
 * Preconditions:
 * 1. It have already installed the CTI.
 * 2. Let the test env in Survival Mode
 * Note:
 * Before the test, make a notification in the company group
 * Login tohttps://toolset.lab.nordigy.ru/qatools/ReadOnly-> Go to 'QATools' -> Go to 'Read Only' -> Choose the XMNUP env
 * Before the test, make a notification in the company group
 * Entry point(/s):
 * > Go to 'Settings' tab
 * > Click the 'Calling' tab
 * > Choose the 'RingOut' option in 'Make my calls with' field
 * > Choose the DID number as 'My Location' value and click 'Save' button
 */
import { AvailabilityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  callingOptions,
  CallingSettings,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
  screen,
} from '@ringcentral-integration/test-utils';

import { MakeOutboundCall } from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockGetRingOut,
  MockPresence,
  TriggerActiveCallChanged,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';

@common
@autorun(test.skip)
@p2
@it
@title('Verify the App support RingOut call in the limited mode')
export class RCI2645 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  CheckCallOut: StepFunction<any, any> = async () => {
    await whenStateChange(() =>
      expect(screen.getByTestId('callItem')).toBeInTheDocument(),
    );
  };

  run() {
    const { CreateMock, Login, CheckCallOut } = this;
    return (
      <Scenario desc="Check could make ringout call in limited mode">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockGetRingOut isDefaultInit={false} />,
            Login,
            ((_, { app }) => {
              const availabilityMonitor =
                app.container.got(AvailabilityMonitor)!;
              availabilityMonitor.setLimitedMode();
            }) as StepFunction,
          ]}
        />
        <Given
          desc="
        > Go to 'Settings' tab
        > Click the 'Calling' tab
        > Choose the 'RingOut' option in 'Make my calls with' field
        > Choose the DID number as 'My Location' value and click 'Save' button"
          action={[
            (async (_, { app }) => {
              app.container.get(CallingSettings).setDataAction({
                callWith: callingOptions.ringout,
              });
            }) as StepFunction,
          ]}
        />
        <When
          desc="Make an outbound call"
          action={[
            <TriggerActiveCallChanged
              handlerSessions={() => [
                {
                  direction: 'Outbound',
                  from: '+14012223521',
                  id: 's-a4a042e1cea20z18d86a3b62bz12d76dd0000',
                  partyId: 'p-a4a042e1cea20z18d86a3b62bz12d76dd0000-1',
                  sessionId: '33452387004',
                  startTime: '2024-02-08T02:54:52.517Z',
                  telephonySessionId: 's-a4a042e1cea20z18d86a3b62bz12d76dd0000',
                  telephonyStatus: 'Ringing',
                  to: '+14012223521',
                },
              ]}
            />,
            <MakeOutboundCall status="connected" phoneNumber="+18882556247" />,
          ]}
        />
        <Then
          desc="It call out successfully"
          action={[<NavigateTo path="/calls" />, CheckCallOut]}
        />
      </Scenario>
    );
  }
}
