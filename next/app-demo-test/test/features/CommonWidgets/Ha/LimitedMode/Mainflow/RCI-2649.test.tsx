/**
 * RCI-2649: Verify the App sync up the call log in the limited mode
 * https://test_it_domain/test-cases/RCI-2649
 * Preconditions:
 * 1. It have already installed the CTI.
 * 2. Let the test env in Survival Mode
 * 3. There are call records in the call history
 * Note:
 * Before the test, make a notification in the company group
 * Login tohttps://toolset.lab.nordigy.ru/qatools/ReadOnly-> Go to 'QATools' -> Go to 'Read Only' -> Choose the XMNUP env
 * Entry point(/s):
 * > Login to the App
 * > Go to 'History'
 */
import { AvailabilityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
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
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { GenerateCallHistory } from '../../../../../steps/CallHistory';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockCallLogSync,
  generateCallLogData,
} from '../../../../../steps/Mock';
import { NavigateToHistory } from '../../../../../steps/Navigate';

@common
@autorun(test)
@p2
@title('Verify the App sync up the call log in the limited mode')
export class RCI2649 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Check call log sync in limited mode">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={GenerateCallHistory({ length: 1 })}
              isDefaultInit
            />,
            Login,
            ((_, { app }) => {
              const availabilityMonitor =
                app.container.got(AvailabilityMonitor)!;
              availabilityMonitor.setLimitedMode();
            }) as StepFunction,
          ]}
        />
        <When
          desc="> Go to 'History', Check the call log history,
                 There are call records in the call history"
          action={[
            NavigateToHistory,
            async () => {
              await waitForRenderReady();
              await whenStateChange(() => {
                expect(screen.getAllByTestId('calls_item_root')).toHaveLength(
                  1,
                );
              });
            },
          ]}
        />
      </Scenario>
    );
  }
}
