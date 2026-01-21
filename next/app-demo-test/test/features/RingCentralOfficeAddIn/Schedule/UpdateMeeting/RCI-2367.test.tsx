/**
 * RCI-2367: Update meeting -  Mark ON RCV PMI
 * https://test_it_domain/test-cases/RCI-2367
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * 2. User has logged in to 3rd party
 * 3.User has rcv meeting permission
 * Entry point(/s):
 * Login to Outlook: Calendar -> New Event > RingCentral Scheduler App
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

import { Entry } from '../../../../steps/Entry';
import { Login as CommonLogin } from '../../../../steps/Login';
import {
  CheckPMIFormat,
  CheckRcvMeetingSettingsValues,
  CheckRCVPageDisplay,
  CheckScheduleButton,
  TurnOnToggle,
} from '../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title('Update meeting -  Mark ON RCV PMI')
export class RCI2367 extends Step {
  Login: StepFunction<any, any>[] | StepFunction<any, any> = [
    Entry,
    CommonLogin,
  ];
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Update meeting -  Mark ON RCV PMI" action={Login}>
        <When
          desc="User has log in and Mark ON 'Use personal Meeting ID xxx-xxx-xxxx '"
          action={[
            CheckRCVPageDisplay,
            CheckPMIFormat,
            <TurnOnToggle dataSign="usePersonalMeetingId" />,
          ]}
        />
        <Then
          desc="Show PMImeeting settings page"
          action={
            ((_, { app }) => {
              const rcVideo = app.container.got(RcVideo)!;
              return (
                <CheckRcvMeetingSettingsValues
                  meeting={rcVideo.personalVideo}
                />
              );
            }) as StepFunction
          }
        />
        <Then
          desc="Show 'Update' button[L10N]"
          action={
            <CheckScheduleButton buttonText="Update" isDisabled={false} />
          }
        />
      </Scenario>
    );
  }
}
