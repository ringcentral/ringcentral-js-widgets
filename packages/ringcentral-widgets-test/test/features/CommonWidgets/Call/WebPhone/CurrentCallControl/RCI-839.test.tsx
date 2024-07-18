/**
 * RCI-839: Current call control_navigate to all calls page
 * https://test_it_domain/test-cases/RCI-839
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Answer an inbound call and keep in active call page, then make an inbound call again, answer the call
 * 2. Make an outbound call and keep in active call page, navigate to dial pad, make an outbound call again
 */
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../../../../lib/step';
import {
  MakeInboundCall,
  MakeOutboundCall,
  CheckBackButton,
  ClickBackButton,
  CheckAllCallsListPage,
  CheckActiveCallExist,
  CheckIncomingCallPageExist,
  AnswerCall,
  AnswerAndHoldCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
  MockActiveCall,
  MockMessageSync,
  TriggerActiveCallChanged,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';

@autorun(test)
@common
@it
@p2
@title('Current call control_navigate to all calls page')
export class RCI839_InboundCall extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Answer an inbound call and keep in active call page, then make an inbound call again, answer the call"
        action={() => [
          CreateMock,
          MockMessageSync,
          <MockActiveCall repeat={0} />,
          Login,

          // make and answer first inbound call
          <MakeInboundCall useUserAgentSession phoneNumber="+18882556247" />,
          TriggerActiveCallChanged,
          CheckIncomingCallPageExist,
          AnswerCall,

          // make an inbound call again and answer it
          <MakeInboundCall useUserAgentSession phoneNumber="+18882556248" />,
          TriggerActiveCallChanged,
          CheckIncomingCallPageExist,
          AnswerAndHoldCall,
        ]}
      >
        <When
          desc="Check the call control page"
          action={CheckActiveCallExist}
        />
        <Then
          desc="There is a 'Back(All Calls)' button"
          action={CheckBackButton}
        />
        <When desc="Press 'Back(All Calls)' button" action={ClickBackButton} />
        <Then
          desc="User should be navigated to All Calls list page"
          action={CheckAllCallsListPage}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@it
@p2
@title('Current call control_navigate to all calls page')
export class RCI839_OutboundCall extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Make an outbound call and keep in active call page, navigate to dial pad, make an outbound call again"
        action={() => [
          CreateMock,
          Login,

          // make first outbound call
          <NavigateTo path="/dialer" />,
          MakeOutboundCall,

          // make an outbound call again
          <NavigateTo path="/dialer" />,
          MakeOutboundCall,
        ]}
      >
        <When
          desc="Check the call control page"
          action={CheckActiveCallExist}
        />
        <Then
          desc="There is a 'Back(All Calls)' button"
          action={CheckBackButton}
        />
        <When desc="Press 'Back(All Calls)' button" action={ClickBackButton} />
        <Then
          desc="User should be navigated to All Calls list page"
          action={CheckAllCallsListPage}
        />
      </Scenario>
    );
  }
}
