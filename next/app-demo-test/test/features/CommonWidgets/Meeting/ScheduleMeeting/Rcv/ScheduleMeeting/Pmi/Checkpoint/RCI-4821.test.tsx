/**
 * RCI-4821: Should use default PMI meeting title
 * https://test_it_domain/test-cases/RCI-4821
 * Preconditions:
 * RC CTI app is installed and enabled
 * User has logged in to 3rd party
 * User log in to RC CTI app
 * User has authorize to Google
 * Entry point(/s):
 * 'Schedule video meeting' page > Select 'Use Personal Meeting ID XXX-XXX-XXX'
 */
import { RcVideo } from '@ringcentral-integration/micro-meeting/src/app/services';
import {
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../../../steps/CreateInstance';
import {
  ClickScheduleButton,
  OperateTopic,
  TurnOnToggle,
} from '../../../../../../../../steps/Meeting';
import { CheckRcvPatchBridge } from '../../../../../../../../steps/Mock/CheckFetchMockResponse.ts';
import { NavigateToMeeting } from '../../../../../../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@common
@title('Should use default PMI meeting title')
export class RCI4821 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );

  Check3rdPartyApi: StepFunction<any, any> = () => null;

  run() {
    const { Login, Check3rdPartyApi } = this;
    return (
      <Scenario desc="Should use default PMI meeting title" action={Login}>
        <When
          desc="Direct to entry point, modify meeting title(eg: test meeting) > Click Schedule meeting button"
          action={[
            NavigateToMeeting,
            <TurnOnToggle dataSign="usePersonalMeetingId" />,
            <OperateTopic topic="test meeting" />,
            ClickScheduleButton,
          ]}
        />
        <Then
          desc="Meeting title 'test meeting' should show on calendar title"
          action={Check3rdPartyApi}
        />
        <When desc="Join the meeting, check the meeting title" />
        <Then
          desc="Meeting title should be default PMI meeting title(eg:FirstName LastName's meeting.)"
          action={
            ((_, { app }) => (
              <CheckRcvPatchBridge
                meeting={{
                  name: app.container.got(RcVideo)!.personalMeeting!.name,
                }}
              />
            )) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
