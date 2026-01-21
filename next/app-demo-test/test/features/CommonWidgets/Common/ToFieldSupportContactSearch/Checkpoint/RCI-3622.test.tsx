/**
 * RCI-3622: To field contact search ghost text
 * https://test_it_domain/test-cases/RCI-3622
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
 */
import {
  autorun,
  common,
  examples,
  it,
  p3,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CallButtonBehavior,
  GoToTransferPage,
  MakeCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CreateMock } from '../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToDialer,
} from '../../../../../steps/Navigate';
import { CheckPlaceholderText } from '../../../../../steps/SearchField/checks/CheckPlaceholderText';

@autorun(test)
@common
@it
@p3
@title('To field contact search ghost text')
export class ToFieldGhostText extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  @examples([
    {
      entry: <NavigateToDialer />,
    },
    {
      entry: <NavigateToComposeText />,
    },
    {
      entry: (
        <>
          <MakeCall />
          <CallButtonBehavior callButtonBehaviorType="callActions" />
          <GoToTransferPage />
        </>
      ),
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="To field contact search ghost text">
        <When
          desc="Direct to entry points"
          action={[CreateMock, Login, this.example.entry, WaitForRenderReady]}
        />
        <Then
          desc="There is 'To' field with ghost text Enter Name or Number[L10N]"
          action={CheckPlaceholderText}
        />
      </Scenario>
    );
  }
}
