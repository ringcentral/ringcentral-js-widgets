/**
 * RCI-4499: "Ignore" button for inbound Queue calls
 * https://test_id_domain/test-cases/RCI-4499
 */

import {
  p2,
  it,
  autorun,
  Given,
  StepFunction,
  Scenario,
  Step,
  And,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock as CommonCreateMock } from '../../../../steps/Mock';
import { CheckToVoiceMailForInboundQueueCall } from '../../../../steps/Call';
import { NavigateToHistory } from '../../../../steps/Navigate';
import { OpenCallLog } from '../../../../steps/CallHistory';

@autorun(test.skip)
@it
@p2
@title('Check "To Voicemail" button for inbound Queue calls')
export class ToVoiceMailForInboundQueue extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
  run() {
    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;
    return (
      <Scenario
        desc="Check 'To Voicemail' button for inbound Queue calls"
        action={CustomCreateMock}
      >
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <And desc="Make inbound queue call" />
        <When desc="User click 'To Voicemail' button" />
        <Then
          desc="User directs to all calls list page"
          action={CheckToVoiceMailForInboundQueueCall}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title('Check "To Voicemail" button on notification for inbound Queue calls')
export class ToVoiceMailOnNotificationForInboundQueue extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
  run() {
    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;
    return (
      <Scenario
        desc="Check 'To Voicemail' button for inbound Queue calls"
        action={CustomCreateMock}
      >
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <And
          desc="User open a call log page"
          action={() => [<NavigateToHistory />, <OpenCallLog />]}
        />
        <And desc="Make inbound queue call" />
        <When desc="User click 'To Voicemail' button" />
        <Then
          desc="User directs to all calls list page"
          action={CheckToVoiceMailForInboundQueueCall}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title('Check "To Voicemail" button on all calls page for inbound Queue calls')
export class ToVoiceMailonAllCallsPageForInboundQueue extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
  run() {
    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;
    return (
      <Scenario
        desc="Check 'To Voicemail' button for inbound Queue calls"
        action={CustomCreateMock}
      >
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <And desc="Make inbound queue call" />
        <And desc="User back to all calls page" />
        <When desc="User click 'To Voicemail' button" />
        <Then
          desc="User directs to all calls list page"
          action={<CheckToVoiceMailForInboundQueueCall isGoToAllCallsPage />}
        />
      </Scenario>
    );
  }
}
