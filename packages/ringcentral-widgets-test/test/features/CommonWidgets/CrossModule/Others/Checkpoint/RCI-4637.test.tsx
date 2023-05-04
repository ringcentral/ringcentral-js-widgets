/**
 * RCI-4637: Show error message when number parser API not responding
 * https://test_id_domain/test-cases/RCI-4637
 * Preconditions:
 * CTI app is integrated,
 * The user is logged-in to 3rd party
 * The user has logged in to CTI
 * Entry point(/s):
 *
  | Entry |Result |
  | Make an outbound call |Fail to place the call |
	| Send a message |The message should not be sent out |

 */

import {
  p3,
  it,
  autorun,
  Given,
  StepProp,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateMock, MockNumberParserV2 } from '../../../../../steps/Mock';
import { CheckAlertMessage } from '../../../../../steps/Alert';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { MakeCall, CheckActiveCallHidden } from '../../../../../steps/Call';
import { NavigateToComposeText } from '../../../../../steps/Navigate';
import { SendSMS } from '../../../../../steps/Messages';

@autorun(test)
@it
@p3
@title('Show error message when make call but number parser API not responding')
export class MakeCallWhenParseAPIFailed extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Show error message when make call but number parser API not responding">
        <Given
          desc="The number parser API failed to return"
          action={[
            CreateMock,
            <MockNumberParserV2 status={503} handler={() => ({})} />,
          ]}
        />
        <And desc="The user has logged in to CTI" action={Login} />
        <When
          desc="Go to Entry points"
          action={<MakeCall direction="Outbound" status="connected" />}
        />
        <Then
          desc="Fail to place the call
                Show error message: 'Sorry, there was a problem on our end. Please try again later.'
                [L10N]"
          action={[
            <CheckAlertMessage message="Sorry, there was a problem on our end. Please try again later." />,
            CheckActiveCallHidden,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@it
@p3
@title(
  'Show error message when send message but number parser API not responding',
)
export class SendSMSWhenParseAPIFailed extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Show error message when send message but number parser API not responding">
        <Given
          desc="The number parser API failed to return"
          action={[
            CreateMock,
            <MockNumberParserV2 status={503} handler={() => ({})} />,
          ]}
        />
        <And desc="The user has logged in to CTI" action={Login} />
        <When
          desc="Go to Entry points"
          action={[
            NavigateToComposeText,
            async () => <SendSMS phoneNumber="1234567" />,
          ]}
        />
        <Then
          desc="The message should not be sent out
                Show error message: 'Sorry, there was a problem on our end. Please try again later.'
                [L10N]"
          action={[
            <CheckAlertMessage message="Sorry, there was a problem on our end. Please try again later." />,
            async (_: any, { rcMock }: any) => {
              expect(
                rcMock.fetchMock.called(
                  'express:/restapi/v1.0/account/~/extension/~/sms',
                ),
              ).toBeFalsy();
            },
          ]}
        />
      </Scenario>
    );
  }
}
