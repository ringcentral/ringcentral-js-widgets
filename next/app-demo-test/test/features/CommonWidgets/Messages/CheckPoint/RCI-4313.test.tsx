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
  autorun,
  common,
  Given,
  p3,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import { CheckButton, CheckComposeTextUI } from '../../../../steps/Messages';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateToComposeText } from '../../../../steps/Navigate';

@autorun(test)
@p3
@common
@title('The UI check of Compose text page layout')
export class ComposeTextUI extends Step {
  CustomLogin: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock: StepFunction<any, any> = CreateMock;
  run() {
    const { CustomLogin, CustomCreateMock } = this;
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
