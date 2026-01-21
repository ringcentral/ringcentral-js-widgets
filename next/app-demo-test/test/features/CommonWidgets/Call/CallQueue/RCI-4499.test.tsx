/**
 * RCI-4499: "Ignore" button for inbound Queue calls
 * https://test_it_domain/test-cases/RCI-4499
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckIgnoreButtonForInboundQueueCall } from '../../../../steps/Call';
import { OpenCallLog } from '../../../../steps/CallHistory';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock as CommonCreateMock } from '../../../../steps/Mock';
import { NavigateToHistory } from '../../../../steps/Navigate';

@autorun(test.skip)
@common
@it
@p2
@title('To voicemail option is hidden for queue call')
export class ToVoiceMailForInboundQueue extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
  run() {
    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;
    return (
      <Scenario
        desc="Check 'To Voicemail' button is not present and Ignore button is present for inbound Queue calls"
        action={CustomCreateMock}
      >
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <And desc="Make inbound queue call" />
        <When desc="User click 'Ignore' button" />
        <Then
          desc="User directs to all calls list page"
          action={CheckIgnoreButtonForInboundQueueCall}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('To voicemail option is hidden for queue call')
export class ToVoiceMailOnNotificationForInboundQueue extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
  run() {
    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;
    return (
      <Scenario
        desc="Check 'To Voicemail' button is not present and Ignore button is present for inbound Queue calls"
        action={CustomCreateMock}
      >
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <And
          desc="User open a call log page"
          action={() => [<NavigateToHistory />, <OpenCallLog />]}
        />
        <And desc="Make inbound queue call" />
        <When desc="User click 'Ignore' button" />
        <Then
          desc="User directs to all calls list page"
          action={CheckIgnoreButtonForInboundQueueCall}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('To voicemail option is hidden for queue call')
export class ToVoiceMailonAllCallsPageForInboundQueue extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
  run() {
    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;
    return (
      <Scenario
        desc="Check 'To Voicemail' button is not present and Ignore button is present for inbound Queue calls"
        action={CustomCreateMock}
      >
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <And desc="Make inbound queue call" />
        <And desc="User back to all calls page" />
        <When desc="User click 'Ignore' button" />
        <Then
          desc="User directs to all calls list page"
          action={<CheckIgnoreButtonForInboundQueueCall isGoToAllCallsPage />}
        />
      </Scenario>
    );
  }
}
