/**
 * RCI-4637: Show error message when number parser API not responding
 * https://test_it_domain/test-cases/RCI-4637
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
  And,
  autorun,
  common,
  Given,
  it,
  p3,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../../../../../steps/Alert';
import { CheckActiveCallHidden, MakeCall } from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../steps/Messages';
import { CreateMock, MockNumberParserV2 } from '../../../../../steps/Mock';
import { NavigateToComposeText } from '../../../../../steps/Navigate';

@autorun(test)
@common
@it
@p3
@title('Show error message when make call but number parser API not responding')
export class MakeCallWhenParseAPIFailed extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
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
@common
@it
@p3
@title(
  'Show error message when send message but number parser API not responding',
)
export class SendSMSWhenParseAPIFailed extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
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
          action={[NavigateToComposeText, <SendSMS phoneNumber="1234567" />]}
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
