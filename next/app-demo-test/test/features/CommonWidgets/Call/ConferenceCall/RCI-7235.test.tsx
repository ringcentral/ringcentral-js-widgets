import { ActiveCallControl } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  Given,
  it,
  p1,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { MakeCall } from '../../../../steps/Call';
import { CheckSectionByDataSign } from '../../../../steps/Call/checks/CheckSectionByDataSign';
import { CheckTextContent } from '../../../../steps/Common';

@autorun(test.skip)
@it
@p1
@common
@title('Call control_hang up')
export class RCI7235Base extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomLogout?: StepFunction<any, any>;
  CustomHangup?: StepFunction<any, any>;
  conferenceCallId = '';
  run() {
    const { CustomLogin, CustomHangup } = this;
    return (
      <Scenario desc="Confirmation popup is displayed when click end button on conferencecall">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CustomLogin,
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              jest
                .spyOn(activeCallControl, 'checkIfConferenceCall')
                .mockImplementation(async () => {
                  console.log('mocked call for is conference call');
                  return true;
                });
              jest
                .spyOn(activeCallControl, 'enableLeaveConferenceAsHost', 'get')
                .mockImplementation(() => {
                  console.log('mocked call for feature flag');
                  return true;
                });
            }) as StepFunction,
          ]}
        />
        <When
          desc="Click end call button"
          action={[<MakeCall isConferenceCall />, CustomHangup]}
        />
        <Then
          desc="A confirmation popup is displayed:
	Title: 'Leave or end call?'
										Button: 'Leave call'
										Button: 'End call for everyone'
										Title: 'Leave or end call?'
										Button: 'Leave call'
										Button: 'End call for everyone'
										[L10N]"
          action={[
            <CheckSectionByDataSign dataSign="leaveCall" />,
            <CheckSectionByDataSign dataSign="endCallForEveryone" />,
            <CheckSectionByDataSign dataSign="leaveOrEndCallTitle" />,
            <CheckTextContent dataSign="leaveCall" content="Leave call" />,
            <CheckTextContent
              dataSign="endCallForEveryone"
              content="End call for everyone"
            />,
            <CheckTextContent
              dataSign="leaveOrEndCallTitle"
              content="Leave or end call?"
            />,
          ]}
        />
      </Scenario>
    );
  }
}
