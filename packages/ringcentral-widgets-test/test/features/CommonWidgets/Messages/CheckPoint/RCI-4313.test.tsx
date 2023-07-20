/**
 * RCI-4313: The UI check of Compose text page layout
 * https://test_it_domain/test-cases/RCI-4313
 * Preconditions:
 * User_A should be the Auto-Receptionist for your Phone System
 * SMS of Company number should be enabled
 * Entry point(/s):
 * > Go to the 'Messages' tab
 * > ALL/Text tab
 * >Click theCompose texticon
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
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
} from '@ringcentral-integration/test-utils';
import { CreateMock as CommonCreateMock } from '../../../../steps/Mock';
import { NavigateToComposeText } from '../../../../steps/Navigate';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CheckButton, CheckComposeTextUI } from '../../../../steps/Messages';

@autorun(test.skip)
@p2
@title('The UI check of Compose text page layout')
export class ComposeTextUI extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
  run() {
    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;
    return (
      <Scenario
        desc="The UI check of Compose text page layout."
        action={CustomCreateMock}
      >
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <When
          desc="Go to the entry point, check the UI of theCompose text page"
          action={NavigateToComposeText}
        />
        <Then
          desc="The 'Send' button is show
										Gray
										disable"
          action={<CheckButton expectDisabled />}
        />
        <Then desc="Show as below" action={CheckComposeTextUI} />
      </Scenario>
    );
  }
}
