/**
 * RCI-3624: To field contact search no matches
 * https://test_it_domain/test-cases/RCI-3624
 * Preconditions:
 * RC CTI app is installed and enabled
 * RC CTI App should be authorized to 3rd party
 * User has login RC CTI App
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * Dial Pad
 * Compose Text
 * Current call control > Transfer
 * Single/Second incoming call > Forward > Custom number
 */
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepProp,
  WaitForRenderReady,
  common,
} from '@ringcentral-integration/test-utils';

import {
  CallButtonBehavior,
  CheckIncomingCallPageExist,
  CustomForwardCall,
  GoToTransferPage,
  MakeCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { InputRecipients } from '../../../../../steps/Messages';
import { CreateMock } from '../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToDialer,
} from '../../../../../steps/Navigate';
import { CheckNotContactsMatched } from '../../../../../steps/SearchField';

@autorun(test)
@common
@it
@p2
@title('To field contact search no matches')
export class NoMatchedContact extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples([
    {
      entry: <NavigateToDialer />,
      action: <InputRecipients content="1111111111" />,
    },
    {
      entry: <NavigateToComposeText messageTabName="messagesTab" />,
      action: <InputRecipients content="test00000" />,
    },
    {
      entry: (
        <>
          <MakeCall />
          <CallButtonBehavior callButtonBehaviorType="callActions" />
          <GoToTransferPage />
        </>
      ),
      action: <InputRecipients content="1111111111" />,
    },
    {
      entry: (
        <>
          <MakeCall direction="Inbound" useUserAgentSession />
          <CheckIncomingCallPageExist />
          <CustomForwardCall customSelector="customNumber" />
        </>
      ),
      action: (
        <InputRecipients content="test00000" containerSelector="forwardPage" />
      ),
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="To field contact search no matches">
        <Given
          desc="Login app with RC account
								Go to entry point"
          action={[CreateMock, Login, this.example.entry, WaitForRenderReady]}
        />
        <When
          desc="Enter {Characters} do not match any contacts in the 'To' field:
                1111111111
                test00000"
          action={this.example.action}
        />
        <Then
          desc="There is no results matched"
          action={CheckNotContactsMatched}
        />
      </Scenario>
    );
  }
}
