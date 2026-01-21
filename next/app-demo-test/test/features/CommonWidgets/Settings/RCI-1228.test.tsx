/**
 * RCI-1228: Settings_Feedback
 * https://test_it_domain/test-cases/RCI-1228
 * Preconditions:
 *
 * Entry point(/s):
 * Login > Settings
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
  type StepFunction,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import { NavigateToSettings } from '../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@common
@title('Settings_Feedback')
export class RCI1288 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CheckFeedback: StepFunction<any, any> = (props) => null;

  run() {
    return (
      <Scenario desc="Check settings feedback">
        <When
          desc="Check if there is a 'Feedback' button in Settings page."
          action={[this.Login, NavigateToSettings]}
        />
        <Then
          desc="1. Show 'Feedback' button
										For Zendesk 2.0.3: show 'Share idea' button
										[L10N]"
        />
        <When desc="Click 'Feedback' button/ 'Share idea' button" />
        <Then
          desc="Popup the feedback form in default browser.
										For Office365link:https://goo.gl/forms/r8JczEAVU0t5zbL62
										For Outlook:
										link:https://forms.gle/nT2niM1NtFDg5RBv7
										For Firefox:
										link:https://forms.gle/E3SY2eLzKu27RL9e7
										For dynamics 2.0:
										link:https://forms.gle/SMXfRSsLM8WDx2Av9
										For Zendesk 2.0.3:
										link: https://ideas.ringcentral.com/For Salesforce classic:
										link:https://docs.google.com/forms/d/e/1FAIpQLSfHnuvx715GhMQAS8_TitDAW78PiD3Si3FpsLDe4Vv0HItWzA/viewform?vc=0&c=0&w=1"
          action={this.CheckFeedback}
        />
      </Scenario>
    );
  }
}
