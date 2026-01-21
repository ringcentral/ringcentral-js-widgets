/**
 * RCI-6555: Only one test audio simultaneously
 * https://test_it_domain/test-cases/RCI-6555
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Account type(/s):
 * Extension type(/s):Entry point(/s):
 * Go to Settings > Audio >Output
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
  StepFunction,
} from '@ringcentral-integration/test-utils';

import { CheckButton, ClickItemByDataSign } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Only one test audio simultaneously')
export class OnlyOneAudioInTest extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Only one test audio simultaneously"
        action={[CreateMock, Login]}
      >
        <When
          desc="Direct to entry points, click the 'Test speaker'"
          action={[
            <NavigateTo path="/settings/audio" />,
            <ClickItemByDataSign dataSign="test-speaker-button" />,
          ]}
        />
        <Then
          desc="The 'Test microphone' button is disabled"
          action={
            <CheckButton
              selector="test-microphone-button"
              text="Test microphone"
              disabled
            />
          }
        />
        <When
          desc="Click 'Stop test'"
          action={<ClickItemByDataSign dataSign="test-speaker-button" />}
        />
        <Then
          desc="The 'Test microphone' button is enabled"
          action={
            <CheckButton
              selector="test-microphone-button"
              text="Test microphone"
              disabled={false}
            />
          }
        />
        <When
          desc="Click the'Test microphone'"
          action={<ClickItemByDataSign dataSign="test-microphone-button" />}
        />
        <Then
          desc="The'Test speaker' button is disabled"
          action={
            <CheckButton
              selector="test-speaker-button"
              text="Test speaker"
              disabled
            />
          }
        />
      </Scenario>
    );
  }
}
